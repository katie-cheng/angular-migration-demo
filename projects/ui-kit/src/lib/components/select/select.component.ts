import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: ReadonlyArray<{ value: string; label: string }> = [];
  @Input() disabled: boolean = false;
  @Output() readonly selectionChanged = new EventEmitter<string>();
  @Input() control: FormControl = new FormControl('');
}
