import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoansListComponent } from './pages/loans-list/loans-list.component';
import { LoansDetailComponent } from './pages/loans-detail/loans-detail.component';

const routes: Routes = [
  { path: '', component: LoansListComponent },
  { path: ':id', component: LoansDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansRoutingModule {}
