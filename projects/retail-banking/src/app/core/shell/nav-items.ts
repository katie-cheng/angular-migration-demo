export interface NavItem {
  label: string;
  route: string;
  icon: string;
  entitlement?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
  { label: 'Accounts', route: '/accounts', icon: 'account_balance', entitlement: 'accounts:read' },
  { label: 'Transfers', route: '/transfers', icon: 'swap_horiz', entitlement: 'transfers:write' },
  { label: 'Bill pay', route: '/bill-pay', icon: 'receipt_long', entitlement: 'billpay:write' },
  { label: 'Send money', route: '/p2p-payments', icon: 'send', entitlement: 'p2p:write' },
  { label: 'Cards', route: '/cards', icon: 'credit_card' },
  { label: 'Loans', route: '/loans', icon: 'request_quote' },
  { label: 'Mortgage', route: '/mortgage', icon: 'home_work' },
  { label: 'Investments', route: '/investments', icon: 'trending_up', entitlement: 'investments:read' },
  { label: 'Statements', route: '/statements', icon: 'description' },
  { label: 'Alerts', route: '/alerts', icon: 'notifications_active' },
  { label: 'Rewards', route: '/rewards', icon: 'redeem' },
  { label: 'Disputes', route: '/disputes', icon: 'gavel' },
  { label: 'Support', route: '/support-chat', icon: 'support_agent' },
  { label: 'Settings', route: '/profile-settings', icon: 'manage_accounts' },
];
