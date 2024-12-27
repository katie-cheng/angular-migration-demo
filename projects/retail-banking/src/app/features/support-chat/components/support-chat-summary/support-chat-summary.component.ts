import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-support-chat-summary',
  templateUrl: './support-chat-summary.component.html',
  styleUrls: ['./support-chat-summary.component.scss'],
})
export class SupportChatSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
