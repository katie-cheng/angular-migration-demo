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

import { RewardsListComponent } from './pages/rewards-list/rewards-list.component';
import { RewardsDetailComponent } from './pages/rewards-detail/rewards-detail.component';
import { RewardsSummaryComponent } from './components/rewards-summary/rewards-summary.component';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsService } from './rewards.service';

@NgModule({
  declarations: [
    RewardsListComponent,
    RewardsDetailComponent,
    RewardsSummaryComponent,
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
    RewardsRoutingModule,
  ],
  providers: [RewardsService],
})
export class RewardsModule {}
