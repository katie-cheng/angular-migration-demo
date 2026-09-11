import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

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
