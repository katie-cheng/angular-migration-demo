import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillPayListComponent } from './pages/bill-pay-list/bill-pay-list.component';
import { BillPayDetailComponent } from './pages/bill-pay-detail/bill-pay-detail.component';
import { BillPayFormComponent } from './pages/bill-pay-form/bill-pay-form.component';

const routes: Routes = [
  { path: '', component: BillPayListComponent },
  { path: 'new', component: BillPayFormComponent },
  { path: ':id/edit', component: BillPayFormComponent },
  { path: ':id', component: BillPayDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPayRoutingModule {}
