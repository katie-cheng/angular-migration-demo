import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[bkTrimInput]' })
export class TrimInputDirective {
  @HostListener('blur', ['$event.target'])
  onBlur(target: HTMLInputElement): void {
    target.value = target.value.trim();
  }
}
