import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
