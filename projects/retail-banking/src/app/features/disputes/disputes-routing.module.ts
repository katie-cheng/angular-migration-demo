import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisputesListComponent } from './pages/disputes-list/disputes-list.component';
import { DisputesDetailComponent } from './pages/disputes-detail/disputes-detail.component';
import { DisputesFormComponent } from './pages/disputes-form/disputes-form.component';

const routes: Routes = [
  { path: '', component: DisputesListComponent },
  { path: 'new', component: DisputesFormComponent },
  { path: ':id/edit', component: DisputesFormComponent },
  { path: ':id', component: DisputesDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisputesRoutingModule {}
