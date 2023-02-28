import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-key-value-list',
  templateUrl: './key-value-list.component.html',
  styleUrls: ['./key-value-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueListComponent {
  @Input() entries: ReadonlyArray<{ key: string; value: string }> = [];
  @Input() columns: number = 1;
}
