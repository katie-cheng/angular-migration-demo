import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[bkAutofocus]' })
export class AutofocusDirective implements AfterViewInit {
  @Input() bkAutofocus = true;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this.bkAutofocus) {
      this.host.nativeElement.focus();
    }
  }
}
