import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsListComponent } from './pages/accounts-list/accounts-list.component';
import { AccountsDetailComponent } from './pages/accounts-detail/accounts-detail.component';

const routes: Routes = [
  { path: '', component: AccountsListComponent },
  { path: ':id', component: AccountsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
