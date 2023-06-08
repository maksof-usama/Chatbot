import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat.component';
import { ChatContainerComponent } from './chat-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ChatComponent, ChatContainerComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: "",
      component: ChatComponent
    }]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
