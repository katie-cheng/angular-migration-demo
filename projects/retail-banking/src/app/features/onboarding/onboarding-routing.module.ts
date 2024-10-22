import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnboardingListComponent } from './pages/onboarding-list/onboarding-list.component';
import { OnboardingDetailComponent } from './pages/onboarding-detail/onboarding-detail.component';
import { OnboardingFormComponent } from './pages/onboarding-form/onboarding-form.component';

const routes: Routes = [
  { path: '', component: OnboardingListComponent },
  { path: 'new', component: OnboardingFormComponent },
  { path: ':id/edit', component: OnboardingFormComponent },
  { path: ':id', component: OnboardingDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
