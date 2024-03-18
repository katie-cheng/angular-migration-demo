import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ANALYTICS_CONFIG, AnalyticsConfig, DEFAULT_ANALYTICS_CONFIG } from './analytics.config';

@NgModule({
  imports: [CommonModule],
})
export class AnalyticsSdkModule {
  static forRoot(config: Partial<AnalyticsConfig> = {}): ModuleWithProviders<AnalyticsSdkModule> {
    return {
      ngModule: AnalyticsSdkModule,
      providers: [
        { provide: ANALYTICS_CONFIG, useValue: { ...DEFAULT_ANALYTICS_CONFIG, ...config } },
      ],
    };
  }
}
