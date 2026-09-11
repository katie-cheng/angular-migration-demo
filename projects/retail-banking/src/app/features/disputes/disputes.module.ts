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

import { DisputesListComponent } from './pages/disputes-list/disputes-list.component';
import { DisputesDetailComponent } from './pages/disputes-detail/disputes-detail.component';
import { DisputesFormComponent } from './pages/disputes-form/disputes-form.component';
import { DisputesSummaryComponent } from './components/disputes-summary/disputes-summary.component';
import { DisputesRoutingModule } from './disputes-routing.module';
import { DisputesService } from './disputes.service';

@NgModule({
  declarations: [
    DisputesListComponent,
    DisputesDetailComponent,
    DisputesFormComponent,
    DisputesSummaryComponent,
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
    DisputesRoutingModule,
  ],
  providers: [DisputesService],
})
export class DisputesModule {}
