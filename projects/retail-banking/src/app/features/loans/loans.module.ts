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

import { LoansListComponent } from './pages/loans-list/loans-list.component';
import { LoansDetailComponent } from './pages/loans-detail/loans-detail.component';
import { LoansSummaryComponent } from './components/loans-summary/loans-summary.component';
import { LoansRoutingModule } from './loans-routing.module';
import { LoansService } from './loans.service';

@NgModule({
  declarations: [
    LoansListComponent,
    LoansDetailComponent,
    LoansSummaryComponent,
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
    LoansRoutingModule,
  ],
  providers: [LoansService],
})
export class LoansModule {}
