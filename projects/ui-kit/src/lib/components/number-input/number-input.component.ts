import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
  @Input() label: string = '';
  @Input() min: number = 0;
  @Input() max: number = 1000000;
  @Input() step: number = 1;
  @Input() control: FormControl = new FormControl('');
}
