import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementsListComponent } from './pages/statements-list/statements-list.component';
import { StatementsDetailComponent } from './pages/statements-detail/statements-detail.component';

const routes: Routes = [
  { path: '', component: StatementsListComponent },
  { path: ':id', component: StatementsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatementsRoutingModule {}
