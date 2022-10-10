import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-account-tile',
  templateUrl: './account-tile.component.html',
  styleUrls: ['./account-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountTileComponent {
  @Input() accountName: string = '';
  @Input() accountNumber: string = '';
  @Input() balance: number = 0;
  @Input() available: number = 0;
  @Output() readonly opened = new EventEmitter<string>();

  get maskedNumber(): string {
    return '\u2022\u2022\u2022\u2022 ' + this.accountNumber.slice(-4);
  }
}
