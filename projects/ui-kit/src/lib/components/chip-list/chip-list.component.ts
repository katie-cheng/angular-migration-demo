import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipListComponent {
  @Input() chips: ReadonlyArray<string> = [];
  @Input() removable: boolean = false;
  @Output() readonly removed = new EventEmitter<string>();
}
