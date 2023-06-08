import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { askQuestion, login, verifyOtp } from '~/lib/api';
import { USER_KEY, session } from '~/lib/storage';
import { preDefinedMessages, validateEmail } from '~/lib/utils';
export type CHAT_TYPE = { text: string; type: "QUESTION" | "ANSWER" };
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats: CHAT_TYPE[] = []
  user: Record<string, any> | null = this.userInfo || null
  noData: boolean = false;
  submitted: boolean = false
  isLoading: boolean = false;
  isOTPVerificationRequired: boolean = false;
  chatForm = new FormGroup({
    question: new FormControl('', [Validators.required])
  })
  socket;
  finalMessage: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.isOTPVerificationRequired = this.user?.['isNewUser'];
    this.pushChat(preDefinedMessages[0])
    this.socket = window?.['io']("wss://app.medwiki.co.in", {
      transports: ["websocket"],
      path: "/node"
    });
    this.socket.on("QUERY_RESPONE_VISITOR", ({
      text,
      visitorId
    }) => {
      const userId = this.user?.['id'];
      if (visitorId == userId) {
        this.pushChat(text);
        setTimeout(() => {
          this.pushChat(preDefinedMessages[5])
          this.finalMessage = true
        }, 3000)
      }
    })
  }
  async submitHandler() {
    if (this.isLoading) return;
    this.chatForm.markAllAsTouched();
    this.submitted = true;
    const val = this.chatForm.value['question']
    if (!this.chatForm.valid) return;
    this.chatForm.reset()
    this.pushChat(val, false)
    try {
      this.isLoading = true
      if (!this.user) {
        if (!validateEmail(val)) {
          throw new Error(preDefinedMessages[1]);
        }
        const response = await login(val);
        this.user = response;

        if (this.user?.['isNewUser']) {
          this.isOTPVerificationRequired = true
          this.pushChat(preDefinedMessages[2]);
          return
        }
        if (response.credit >= response.maxCredit) {
          this.user = null
          throw new Error(preDefinedMessages[3]);
        }
        this.pushChat(preDefinedMessages[4].replace('Thank you for your email verification, ', ''));
        session.set(USER_KEY, response);
        return;
      }
      if (this.isOTPVerificationRequired) {
        const response = await verifyOtp({
          otp: val,
          email: this.user?.['email'],
        });
        this.user = response;
        if (response.credit >= response.maxCredit) {
          this.user = null
          throw new Error(preDefinedMessages[3]);
        }
        this.pushChat(preDefinedMessages[4]);
        this.isOTPVerificationRequired = false
        session.set(USER_KEY, response);
        return;
      }
      const response = await askQuestion(val);
      this.pushChat(response.message);
    } catch (err: any) {
      if (err.status === 401) {
        session.clear(USER_KEY)
        this.user = null
      }
      this.pushChat(err?.json?.message || err.message);
    } finally {
      this.isLoading = false;
    }




  }
  pushChat(text, answer = true) {
    this.chats.push({
      text,
      type: answer ? 'ANSWER' : "QUESTION"
    })
    const chatBody = document.getElementById("chat-container");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
  get userInfo() {
    return session.get(USER_KEY);
  }
}
