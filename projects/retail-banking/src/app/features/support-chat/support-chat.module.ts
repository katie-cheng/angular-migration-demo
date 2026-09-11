import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { UiKitModule } from 'ui-kit';

import { SupportChatListComponent } from './pages/support-chat-list/support-chat-list.component';
import { SupportChatDetailComponent } from './pages/support-chat-detail/support-chat-detail.component';
import { SupportChatFormComponent } from './pages/support-chat-form/support-chat-form.component';
import { SupportChatSummaryComponent } from './components/support-chat-summary/support-chat-summary.component';
import { SupportChatRoutingModule } from './support-chat-routing.module';
import { SupportChatService } from './support-chat.service';

@NgModule({
  declarations: [
    SupportChatListComponent,
    SupportChatDetailComponent,
    SupportChatFormComponent,
    SupportChatSummaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    UiKitModule,
    SupportChatRoutingModule,
  ],
  providers: [SupportChatService],
})
export class SupportChatModule {}
