import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSettingsListComponent } from './pages/profile-settings-list/profile-settings-list.component';
import { ProfileSettingsDetailComponent } from './pages/profile-settings-detail/profile-settings-detail.component';
import { ProfileSettingsFormComponent } from './pages/profile-settings-form/profile-settings-form.component';

const routes: Routes = [
  { path: '', component: ProfileSettingsListComponent },
  { path: 'new', component: ProfileSettingsFormComponent },
  { path: ':id/edit', component: ProfileSettingsFormComponent },
  { path: ':id', component: ProfileSettingsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSettingsRoutingModule {}
