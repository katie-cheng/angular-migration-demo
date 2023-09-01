import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[bkClickOutside]' })
export class ClickOutsideDirective {
  @Output() bkClickOutside = new EventEmitter<void>();

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    if (!this.host.nativeElement.contains(target)) {
      this.bkClickOutside.emit();
    }
  }
}
