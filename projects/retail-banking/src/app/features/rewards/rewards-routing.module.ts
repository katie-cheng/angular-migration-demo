import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RewardsListComponent } from './pages/rewards-list/rewards-list.component';
import { RewardsDetailComponent } from './pages/rewards-detail/rewards-detail.component';

const routes: Routes = [
  { path: '', component: RewardsListComponent },
  { path: ':id', component: RewardsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardsRoutingModule {}
