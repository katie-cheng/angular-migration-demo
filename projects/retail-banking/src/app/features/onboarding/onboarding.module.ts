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

import { OnboardingListComponent } from './pages/onboarding-list/onboarding-list.component';
import { OnboardingDetailComponent } from './pages/onboarding-detail/onboarding-detail.component';
import { OnboardingFormComponent } from './pages/onboarding-form/onboarding-form.component';
import { OnboardingSummaryComponent } from './components/onboarding-summary/onboarding-summary.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingService } from './onboarding.service';

@NgModule({
  declarations: [
    OnboardingListComponent,
    OnboardingDetailComponent,
    OnboardingFormComponent,
    OnboardingSummaryComponent,
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
    OnboardingRoutingModule,
  ],
  providers: [OnboardingService],
})
export class OnboardingModule {}
