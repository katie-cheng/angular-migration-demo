import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { RouterModule, Routes } from '@angular/router';
import { LegacyChartsModule } from '@northwind/legacy-charts';

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
    LegacyChartsModule,
    UiKitModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
