import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bk-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() control: FormControl = new FormControl('');
}
