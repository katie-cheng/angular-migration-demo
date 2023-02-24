import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  @Input() icon: string = 'more_vert';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() readonly pressed = new EventEmitter<MouseEvent>();
}
