import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupportChatListComponent } from './pages/support-chat-list/support-chat-list.component';
import { SupportChatDetailComponent } from './pages/support-chat-detail/support-chat-detail.component';
import { SupportChatFormComponent } from './pages/support-chat-form/support-chat-form.component';

const routes: Routes = [
  { path: '', component: SupportChatListComponent },
  { path: 'new', component: SupportChatFormComponent },
  { path: ':id/edit', component: SupportChatFormComponent },
  { path: ':id', component: SupportChatDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportChatRoutingModule {}
