import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() maxLength: number = 120;
  @Input() disabled: boolean = false;
  @Input() control: FormControl = new FormControl('');
}
