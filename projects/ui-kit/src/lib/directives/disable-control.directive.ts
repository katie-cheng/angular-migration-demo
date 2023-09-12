import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[bkDisableControl]' })
export class DisableControlDirective {
  @Input()
  set bkDisableControl(disabled: boolean) {
    const action = disabled ? 'disable' : 'enable';
    this.ngControl.control?.[action]();
  }

  constructor(private readonly ngControl: NgControl) {}
}
