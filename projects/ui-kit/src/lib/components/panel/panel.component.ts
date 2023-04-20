import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @Input() title: string = '';
  @Input() tone: 'neutral' | 'info' | 'warn' = 'neutral';
}
