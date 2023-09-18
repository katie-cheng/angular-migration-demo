import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[bkElevation]' })
export class ElevationDirective {
  @Input() bkElevation = 1;

  @HostBinding('style.boxShadow')
  get shadow(): string {
    return '0 ' + this.bkElevation + 'px ' + this.bkElevation * 3 + 'px rgba(31, 41, 51, 0.14)';
  }
}
