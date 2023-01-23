import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() heading: string = 'Nothing here yet';
  @Input() message: string = '';
  @Input() actionLabel: string = '';
  @Output() readonly actioned = new EventEmitter<void>();
}
