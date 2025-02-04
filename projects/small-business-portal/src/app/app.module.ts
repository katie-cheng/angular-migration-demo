import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
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
    FlexLayoutModule,
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
