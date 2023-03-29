import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-nav-rail',
  templateUrl: './nav-rail.component.html',
  styleUrls: ['./nav-rail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavRailComponent {
  @Input() items: ReadonlyArray<{ id: string; label: string; icon: string }> = [];
  @Input() activeId: string = '';
  @Output() readonly navigated = new EventEmitter<string>();
}
