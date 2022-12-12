import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() readonly changed = new EventEmitter<boolean>();
  @Input() control: FormControl = new FormControl('');
}
