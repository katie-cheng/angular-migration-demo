import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnalyticsSdkModule } from 'analytics-sdk';
import { AuthModule } from 'auth';
import { DataProvidersModule } from 'data-providers';
import { UiKitModule } from 'ui-kit';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientBookComponent } from './client-book/client-book.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, ClientBookComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
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
