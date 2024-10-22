import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-onboarding-summary',
  templateUrl: './onboarding-summary.component.html',
  styleUrls: ['./onboarding-summary.component.scss'],
})
export class OnboardingSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
