import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[bkTestId]' })
export class TestIdDirective {
  @Input() bkTestId = '';

  @HostBinding('attr.data-test-id')
  get testId(): string {
    return this.bkTestId;
  }
}
