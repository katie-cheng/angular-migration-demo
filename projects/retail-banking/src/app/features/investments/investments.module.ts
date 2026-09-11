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
