import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent {
  @Input() label: string = '';
  @Input() options: ReadonlyArray<{ value: string; label: string }> = [];
  @Input() control: FormControl = new FormControl('');
}
