import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
