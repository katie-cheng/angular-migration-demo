import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MortgageListComponent } from './pages/mortgage-list/mortgage-list.component';
import { MortgageDetailComponent } from './pages/mortgage-detail/mortgage-detail.component';

const routes: Routes = [
  { path: '', component: MortgageListComponent },
  { path: ':id', component: MortgageDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortgageRoutingModule {}
