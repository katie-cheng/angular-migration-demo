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

import { InvestmentsListComponent } from './pages/investments-list/investments-list.component';
import { InvestmentsDetailComponent } from './pages/investments-detail/investments-detail.component';
import { InvestmentsSummaryComponent } from './components/investments-summary/investments-summary.component';
import { InvestmentsRoutingModule } from './investments-routing.module';
import { InvestmentsService } from './investments.service';

@NgModule({
  declarations: [
    InvestmentsListComponent,
    InvestmentsDetailComponent,
    InvestmentsSummaryComponent,
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
    InvestmentsRoutingModule,
  ],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}
