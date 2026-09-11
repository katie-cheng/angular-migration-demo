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

import { P2pPaymentsListComponent } from './pages/p2p-payments-list/p2p-payments-list.component';
import { P2pPaymentsDetailComponent } from './pages/p2p-payments-detail/p2p-payments-detail.component';
import { P2pPaymentsFormComponent } from './pages/p2p-payments-form/p2p-payments-form.component';
import { P2pPaymentsSummaryComponent } from './components/p2p-payments-summary/p2p-payments-summary.component';
import { P2pPaymentsRoutingModule } from './p2p-payments-routing.module';
import { P2pPaymentsService } from './p2p-payments.service';

@NgModule({
  declarations: [
    P2pPaymentsListComponent,
    P2pPaymentsDetailComponent,
    P2pPaymentsFormComponent,
    P2pPaymentsSummaryComponent,
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
    P2pPaymentsRoutingModule,
  ],
  providers: [P2pPaymentsService],
})
export class P2pPaymentsModule {}
