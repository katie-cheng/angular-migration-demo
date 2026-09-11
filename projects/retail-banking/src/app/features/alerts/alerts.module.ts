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

import { AlertsListComponent } from './pages/alerts-list/alerts-list.component';
import { AlertsDetailComponent } from './pages/alerts-detail/alerts-detail.component';
import { AlertsFormComponent } from './pages/alerts-form/alerts-form.component';
import { AlertsSummaryComponent } from './components/alerts-summary/alerts-summary.component';
import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsService } from './alerts.service';

@NgModule({
  declarations: [
    AlertsListComponent,
    AlertsDetailComponent,
    AlertsFormComponent,
    AlertsSummaryComponent,
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
    AlertsRoutingModule,
  ],
  providers: [AlertsService],
})
export class AlertsModule {}
