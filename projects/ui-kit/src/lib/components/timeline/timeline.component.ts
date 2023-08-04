import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  @Input() events: ReadonlyArray<{ label: string; at: string; done: boolean }> = [];
}
