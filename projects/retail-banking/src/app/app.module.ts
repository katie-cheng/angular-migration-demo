import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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

@NgModule({ declarations: [
        AppComponent,
        ShellComponent,
        LoginComponent,
        StepUpComponent,
        NotEntitledComponent,
        NotFoundComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
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
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
