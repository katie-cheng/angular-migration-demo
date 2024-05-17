import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard, EntitlementGuard, MfaGuard } from 'auth';

import { LoginComponent } from './core/pages/login/login.component';
import { NotEntitledComponent } from './core/pages/not-entitled/not-entitled.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ShellComponent } from './core/shell/shell.component';
import { StepUpComponent } from './core/pages/step-up/step-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'step-up', component: StepUpComponent, canActivate: [AuthGuard] },
  { path: 'not-entitled', component: NotEntitledComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'accounts',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./features/accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'transfers',
        canActivate: [MfaGuard, EntitlementGuard],
        data: { entitlement: 'transfers:write' },
        loadChildren: () =>
          import('./features/transfers/transfers.module').then((m) => m.TransfersModule),
      },
      {
        path: 'bill-pay',
        canActivate: [EntitlementGuard],
        data: { entitlement: 'billpay:write' },
        loadChildren: () =>
          import('./features/bill-pay/bill-pay.module').then((m) => m.BillPayModule),
      },
      {
        path: 'p2p-payments',
        canActivate: [MfaGuard, EntitlementGuard],
        data: { entitlement: 'p2p:write' },
        loadChildren: () =>
          import('./features/p2p-payments/p2p-payments.module').then((m) => m.P2pPaymentsModule),
      },
      {
        path: 'cards',
        loadChildren: () => import('./features/cards/cards.module').then((m) => m.CardsModule),
      },
      {
        path: 'loans',
        loadChildren: () => import('./features/loans/loans.module').then((m) => m.LoansModule),
      },
      {
        path: 'mortgage',
        loadChildren: () =>
          import('./features/mortgage/mortgage.module').then((m) => m.MortgageModule),
      },
      {
        path: 'investments',
        canActivate: [EntitlementGuard],
        data: { entitlement: 'investments:read' },
        loadChildren: () =>
          import('./features/investments/investments.module').then((m) => m.InvestmentsModule),
      },
      {
        path: 'statements',
        loadChildren: () =>
          import('./features/statements/statements.module').then((m) => m.StatementsModule),
      },
      {
        path: 'alerts',
        loadChildren: () => import('./features/alerts/alerts.module').then((m) => m.AlertsModule),
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./features/profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      {
        path: 'onboarding',
        loadChildren: () =>
          import('./features/onboarding/onboarding.module').then((m) => m.OnboardingModule),
      },
      {
        path: 'disputes',
        loadChildren: () =>
          import('./features/disputes/disputes.module').then((m) => m.DisputesModule),
      },
      {
        path: 'rewards',
        loadChildren: () => import('./features/rewards/rewards.module').then((m) => m.RewardsModule),
      },
      {
        path: 'support-chat',
        loadChildren: () =>
          import('./features/support-chat/support-chat.module').then((m) => m.SupportChatModule),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
