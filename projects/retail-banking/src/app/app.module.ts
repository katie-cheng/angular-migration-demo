import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnalyticsSdkModule } from 'analytics-sdk';
import { AuthModule } from 'auth';
import { DataProvidersModule } from 'data-providers';
import { UiKitModule } from 'ui-kit';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './core/pages/login/login.component';
import { NotEntitledComponent } from './core/pages/not-entitled/not-entitled.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ShellComponent } from './core/shell/shell.component';
import { StepUpComponent } from './core/pages/step-up/step-up.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoginComponent,
    StepUpComponent,
    NotEntitledComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    UiKitModule,
    AuthModule.forRoot({ issuer: environment.issuer, apiBase: environment.apiBase }),
    AnalyticsSdkModule.forRoot({
      collectorUrl: environment.collectorUrl,
      clientVersion: environment.version,
      debug: !environment.production,
    }),
    DataProvidersModule.forRoot({ region: environment.region }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
