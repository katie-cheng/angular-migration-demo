import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { LedgerProvider } from './ledger.provider';
import { LegacyCoreProvider } from './legacy-core.provider';
import {
  BANKING_PROVIDER,
  BankingProvider,
  DEFAULT_PROVIDER_ROUTING,
  PROVIDER_ROUTING,
  ProviderRoutingConfig,
} from './provider.tokens';

export function bankingProviderFactory(
  routing: ProviderRoutingConfig,
  legacy: LegacyCoreProvider,
  ledger: LedgerProvider
): BankingProvider {
  return routing.legacyRegions.indexOf(routing.region) !== -1 ? legacy : ledger;
}

@NgModule({
  imports: [CommonModule],
})
export class DataProvidersModule {
  static forRoot(
    routing: Partial<ProviderRoutingConfig> = {}
  ): ModuleWithProviders<DataProvidersModule> {
    return {
      ngModule: DataProvidersModule,
      providers: [
        { provide: PROVIDER_ROUTING, useValue: { ...DEFAULT_PROVIDER_ROUTING, ...routing } },
        {
          provide: BANKING_PROVIDER,
          useFactory: bankingProviderFactory,
          deps: [PROVIDER_ROUTING, LegacyCoreProvider, LedgerProvider],
        },
      ],
    };
  }
}
