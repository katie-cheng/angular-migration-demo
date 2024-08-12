import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardsListComponent } from './pages/cards-list/cards-list.component';
import { CardsDetailComponent } from './pages/cards-detail/cards-detail.component';

const routes: Routes = [
  { path: '', component: CardsListComponent },
  { path: ':id', component: CardsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsRoutingModule {}
