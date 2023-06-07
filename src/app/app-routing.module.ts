import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatComponent } from './pages/chat/chat.component';

// Import your components for routing

const routes: Routes = [
    { path: '', component: ChatComponent },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }