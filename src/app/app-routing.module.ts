import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components for routing

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }