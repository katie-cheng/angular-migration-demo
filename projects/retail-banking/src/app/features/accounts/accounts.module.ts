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

import { AccountsListComponent } from './pages/accounts-list/accounts-list.component';
import { AccountsDetailComponent } from './pages/accounts-detail/accounts-detail.component';
import { AccountsSummaryComponent } from './components/accounts-summary/accounts-summary.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsService } from './accounts.service';

@NgModule({
  declarations: [
    AccountsListComponent,
    AccountsDetailComponent,
    AccountsSummaryComponent,
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
    AccountsRoutingModule,
  ],
  providers: [AccountsService],
})
export class AccountsModule {}
