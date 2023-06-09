import { Component, Input, OnInit } from '@angular/core';
import { CHAT_TYPE } from '~/app/pages/chat/chat.component';
import * as MarkDownIt from 'markdown-it';
@Component({
  selector: 'app-chat-container',
  template: `
    <div class="chat-container" id="containerElement">
      <div *ngFor="let chat of chats">
        <div class="questoin" [ngClass]="{ answer: chat.type == 'ANSWER' }">
          <div class="text-mesg">
            <div class="user-icon">
              <span
                ><img
                  *ngIf="chat.type == 'ANSWER'"
                  src="https://storage.googleapis.com/dawaadost.appspot.com/medwiki-videos/medwiki-assets/user.png"
                  alt="user-icon"
                />
                <img
                  *ngIf="chat.type == 'QUESTION'"
                  src="../../../assets/img/user.png"
                  alt="user-icon"
                />
              </span>
            </div>
            <div class="mesg-main">
              <div class="mesg">
                <p [innerHTML]="md.render(chat.text)"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/" *ngIf="finalMessage">Link</a>
      <div id="chatscroll"></div>
    </div>
  `,
})
export class ChatContainerComponent implements OnInit {
  @Input() chats: CHAT_TYPE[] = [];
  @Input() finalMessage: boolean = false;
  constructor() {}
  md: MarkDownIt = new MarkDownIt({
    html: true,
    linkify: true,
  });
  ngOnInit(): void {}
}

// chat.type == 'ANSWER' == user
// chat.type == 'QUESTION' == doctor
