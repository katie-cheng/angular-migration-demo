import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBannerComponent {
  @Input() tone: 'info' | 'success' | 'warn' | 'error' = 'info';
  @Input() message: string = '';
  @Input() dismissible: boolean = false;
  @Output() readonly dismissed = new EventEmitter<void>();

  get iconName(): string {
    switch (this.tone) {
      case 'success':
        return 'check_circle';
      case 'warn':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }
}
