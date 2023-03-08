import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() items: ReadonlyArray<{ id: string; label: string }> = [];
  @Input() triggerLabel: string = 'Actions';
  @Output() readonly itemSelected = new EventEmitter<string>();
}
