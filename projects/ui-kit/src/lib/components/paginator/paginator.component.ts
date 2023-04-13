import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bk-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 25;
  @Input() pageSizeOptions: ReadonlyArray<number> = [10, 25, 50];
  @Output() readonly pageChanged = new EventEmitter<number>();

  pageSizeOptionsArray: number[] = [10, 25, 50];

  ngOnChanges(): void {
    this.pageSizeOptionsArray = this.pageSizeOptions.slice();
  }
}
