import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvestmentsListComponent } from './pages/investments-list/investments-list.component';
import { InvestmentsDetailComponent } from './pages/investments-detail/investments-detail.component';

const routes: Routes = [
  { path: '', component: InvestmentsListComponent },
  { path: ':id', component: InvestmentsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentsRoutingModule {}
