import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnalyticsSdkModule } from 'analytics-sdk';
import { AuthModule } from 'auth';
import { DataProvidersModule } from 'data-providers';
import { UiKitModule } from 'ui-kit';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApprovalsComponent } from './approvals/approvals.component';
import { PayrollSummaryComponent } from './payroll/payroll-summary.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, ApprovalsComponent, PayrollSummaryComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    UiKitModule,
    AuthModule.forRoot({ issuer: environment.issuer, apiBase: environment.apiBase }),
    AnalyticsSdkModule.forRoot({ collectorUrl: environment.collectorUrl }),
    DataProvidersModule.forRoot({ region: environment.region }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
