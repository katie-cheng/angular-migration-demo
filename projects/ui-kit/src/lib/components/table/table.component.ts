import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columns: ReadonlyArray<string> = [];
  @Input() rows: ReadonlyArray<Record<string, unknown>> = [];
  @Input() dense: boolean = false;
  @Output() readonly rowSelected = new EventEmitter<string>();

  dataSource: Record<string, unknown>[] = [];

  ngOnChanges(): void {
    this.dataSource = this.rows.slice();
  }
}
