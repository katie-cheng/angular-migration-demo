import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-metric-tile',
  templateUrl: './metric-tile.component.html',
  styleUrls: ['./metric-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricTileComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() delta: number = 0;
}
