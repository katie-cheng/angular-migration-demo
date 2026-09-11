import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';

import { UiKitModule } from 'ui-kit';

import { BalanceStripComponent } from './components/balance-strip/balance-strip.component';
import { DashboardComponent } from './dashboard.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { SpendBreakdownComponent } from './components/spend-breakdown/spend-breakdown.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    BalanceStripComponent,
    QuickActionsComponent,
    RecentActivityComponent,
    SpendBreakdownComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    UiKitModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
