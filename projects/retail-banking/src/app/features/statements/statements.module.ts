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

import { StatementsListComponent } from './pages/statements-list/statements-list.component';
import { StatementsDetailComponent } from './pages/statements-detail/statements-detail.component';
import { StatementsSummaryComponent } from './components/statements-summary/statements-summary.component';
import { StatementsRoutingModule } from './statements-routing.module';
import { StatementsService } from './statements.service';

@NgModule({
  declarations: [
    StatementsListComponent,
    StatementsDetailComponent,
    StatementsSummaryComponent,
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
    StatementsRoutingModule,
  ],
  providers: [StatementsService],
})
export class StatementsModule {}
