import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  @Input() heading: string = '';
  @Input() actionLabel: string = '';
  @Output() readonly actioned = new EventEmitter<void>();
}
