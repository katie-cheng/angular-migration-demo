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

import { BillPayListComponent } from './pages/bill-pay-list/bill-pay-list.component';
import { BillPayDetailComponent } from './pages/bill-pay-detail/bill-pay-detail.component';
import { BillPayFormComponent } from './pages/bill-pay-form/bill-pay-form.component';
import { BillPaySummaryComponent } from './components/bill-pay-summary/bill-pay-summary.component';
import { BillPayRoutingModule } from './bill-pay-routing.module';
import { BillPayService } from './bill-pay.service';

@NgModule({
  declarations: [
    BillPayListComponent,
    BillPayDetailComponent,
    BillPayFormComponent,
    BillPaySummaryComponent,
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
    BillPayRoutingModule,
  ],
  providers: [BillPayService],
})
export class BillPayModule {}
