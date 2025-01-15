import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersListComponent } from './pages/transfers-list/transfers-list.component';
import { TransfersDetailComponent } from './pages/transfers-detail/transfers-detail.component';
import { TransfersFormComponent } from './pages/transfers-form/transfers-form.component';

const routes: Routes = [
  { path: '', component: TransfersListComponent },
  { path: 'new', component: TransfersFormComponent },
  { path: ':id/edit', component: TransfersFormComponent },
  { path: ':id', component: TransfersDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfersRoutingModule {}
