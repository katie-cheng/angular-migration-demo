import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string | null = null;
  @Input() loading: boolean = false;
  @Output() readonly pressed = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.stopPropagation();
      return;
    }
    this.pressed.emit(event);
  }
}
