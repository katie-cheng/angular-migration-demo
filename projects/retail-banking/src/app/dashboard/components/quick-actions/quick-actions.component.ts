import { Component } from '@angular/core';

import { AnalyticsService } from 'analytics-sdk';

interface QuickAction {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'bk-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent {
  readonly actions: QuickAction[] = [
    { label: 'Transfer', icon: 'swap_horiz', route: '/transfers/new' },
    { label: 'Pay a bill', icon: 'receipt_long', route: '/bill-pay/new' },
    { label: 'Send money', icon: 'send', route: '/p2p-payments/new' },
    { label: 'Freeze card', icon: 'ac_unit', route: '/cards' },
    { label: 'Statements', icon: 'description', route: '/statements' },
    { label: 'Get support', icon: 'support_agent', route: '/support-chat' },
  ];

  constructor(private readonly analytics: AnalyticsService) {}

  track(action: QuickAction): void {
    this.analytics.track('cta_click', { id: 'quick-action:' + action.route });
  }
}
