import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AUTH_CONFIG, AuthConfig, DEFAULT_AUTH_CONFIG } from './auth.config';
import { AuthInterceptor } from './auth.interceptor';
import { SESSION_INITIALIZER } from './session-initializer';

@NgModule({
  imports: [CommonModule],
})
export class AuthModule {
  static forRoot(config: Partial<AuthConfig> = {}): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AUTH_CONFIG, useValue: { ...DEFAULT_AUTH_CONFIG, ...config } },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        SESSION_INITIALIZER,
      ],
    };
  }
}
