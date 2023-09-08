import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[bkCopyToClipboard]' })
export class CopyToClipboardDirective {
  @Input() bkCopyToClipboard = '';
  @Output() copied = new EventEmitter<string>();

  @HostListener('click')
  onClick(): void {
    this.copied.emit(this.bkCopyToClipboard);
  }
}
