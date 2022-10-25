import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountInputComponent {
  @Input() label: string = 'Amount';
  @Input() currency: string = 'USD';
  @Input() control: FormControl = new FormControl('');
}
