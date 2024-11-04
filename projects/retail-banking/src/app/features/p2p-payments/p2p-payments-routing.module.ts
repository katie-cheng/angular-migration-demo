import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { P2pPaymentsListComponent } from './pages/p2p-payments-list/p2p-payments-list.component';
import { P2pPaymentsDetailComponent } from './pages/p2p-payments-detail/p2p-payments-detail.component';
import { P2pPaymentsFormComponent } from './pages/p2p-payments-form/p2p-payments-form.component';

const routes: Routes = [
  { path: '', component: P2pPaymentsListComponent },
  { path: 'new', component: P2pPaymentsFormComponent },
  { path: ':id/edit', component: P2pPaymentsFormComponent },
  { path: ':id', component: P2pPaymentsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pPaymentsRoutingModule {}
