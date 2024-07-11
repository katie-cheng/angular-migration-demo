import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertsListComponent } from './pages/alerts-list/alerts-list.component';
import { AlertsDetailComponent } from './pages/alerts-detail/alerts-detail.component';
import { AlertsFormComponent } from './pages/alerts-form/alerts-form.component';

const routes: Routes = [
  { path: '', component: AlertsListComponent },
  { path: 'new', component: AlertsFormComponent },
  { path: ':id/edit', component: AlertsFormComponent },
  { path: ':id', component: AlertsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
