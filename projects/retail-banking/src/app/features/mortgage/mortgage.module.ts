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
