import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparklineComponent {
  @Input() values: number[] = [];
  @Input() stroke: string = '#003366';
  @Input() label: string = 'Trend';

  get points(): string {
    const values = this.values.length ? this.values : [0];
    const max = Math.max(...values, 1);
    const step = 100 / Math.max(values.length - 1, 1);
    return values.map((value, index) => index * step + ',' + (30 - (value / max) * 30)).join(' ');
  }
}
