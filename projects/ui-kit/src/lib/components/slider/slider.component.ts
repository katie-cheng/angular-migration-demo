import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() value: number = 0;
  @Input() label: string = '';
  @Output() readonly valueChanged = new EventEmitter<string>();
}
