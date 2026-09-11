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

import { MortgageListComponent } from './pages/mortgage-list/mortgage-list.component';
import { MortgageDetailComponent } from './pages/mortgage-detail/mortgage-detail.component';
import { MortgageSummaryComponent } from './components/mortgage-summary/mortgage-summary.component';
import { MortgageRoutingModule } from './mortgage-routing.module';
import { MortgageService } from './mortgage.service';

@NgModule({
  declarations: [
    MortgageListComponent,
    MortgageDetailComponent,
    MortgageSummaryComponent,
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
    MortgageRoutingModule,
  ],
  providers: [MortgageService],
})
export class MortgageModule {}
