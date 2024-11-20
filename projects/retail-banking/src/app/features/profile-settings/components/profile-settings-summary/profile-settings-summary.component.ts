import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-profile-settings-summary',
  templateUrl: './profile-settings-summary.component.html',
  styleUrls: ['./profile-settings-summary.component.scss'],
})
export class ProfileSettingsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
