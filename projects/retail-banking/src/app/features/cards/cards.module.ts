import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
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

import { CardsListComponent } from './pages/cards-list/cards-list.component';
import { CardsDetailComponent } from './pages/cards-detail/cards-detail.component';
import { CardsSummaryComponent } from './components/cards-summary/cards-summary.component';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsService } from './cards.service';

@NgModule({
  declarations: [
    CardsListComponent,
    CardsDetailComponent,
    CardsSummaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
    CardsRoutingModule,
  ],
  providers: [CardsService],
})
export class CardsModule {}
