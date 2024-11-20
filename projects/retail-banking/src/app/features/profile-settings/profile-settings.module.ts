import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { UiKitModule } from 'ui-kit';

import { ProfileSettingsListComponent } from './pages/profile-settings-list/profile-settings-list.component';
import { ProfileSettingsDetailComponent } from './pages/profile-settings-detail/profile-settings-detail.component';
import { ProfileSettingsFormComponent } from './pages/profile-settings-form/profile-settings-form.component';
import { ProfileSettingsSummaryComponent } from './components/profile-settings-summary/profile-settings-summary.component';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsService } from './profile-settings.service';

@NgModule({
  declarations: [
    ProfileSettingsListComponent,
    ProfileSettingsDetailComponent,
    ProfileSettingsFormComponent,
    ProfileSettingsSummaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    UiKitModule,
    ProfileSettingsRoutingModule,
  ],
  providers: [ProfileSettingsService],
})
export class ProfileSettingsModule {}
