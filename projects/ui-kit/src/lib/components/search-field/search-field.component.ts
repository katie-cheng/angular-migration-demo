import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent {
  @Input() placeholder: string = 'Search';
  @Output() readonly searched = new EventEmitter<string>();
  @Input() control: FormControl = new FormControl('');
}
