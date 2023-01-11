import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent {
  @Input() label: string = 'Date range';
}
