import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortHeaderComponent {
  @Input() label: string = '';
  @Input() active: boolean = false;
  @Input() direction: 'asc' | 'desc' = 'asc';
  @Output() readonly sorted = new EventEmitter<string>();
}
