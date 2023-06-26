import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-status-pill',
  templateUrl: './status-pill.component.html',
  styleUrls: ['./status-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusPillComponent {
  @Input() status: string = 'pending';
}
