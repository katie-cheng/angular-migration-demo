import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Holding } from '../../investments.model';
import { InvestmentsService } from '../../investments.service';

@Component({
  selector: 'bk-investments-list',
  templateUrl: './investments-list.component.html',
  styleUrls: ['./investments-list.component.scss'],
})
export class InvestmentsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  readonly displayedColumns = ['symbol', 'units', 'marketValue', 'gainLoss'];
  readonly search = new FormControl('');

  rows: Holding[] = [];
  total = 0;
  page = 1;
  pageSize = 25;
  loading = false;
  error: string | null = null;

  private readonly destroyed$ = new Subject<void>();

  constructor(private readonly service: InvestmentsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.reload();
    this.search.valueChanges
      .pipe(debounceTime(250), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.page = 1;
        this.reload();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  reload(): void {
    this.loading = true;
    this.error = null;
    this.service
      .list(this.page, this.pageSize)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.rows = result.items;
          this.total = result.total;
          this.loading = false;
        },
        error: () => {
          this.error = 'We could not load investments right now.';
          this.loading = false;
        },
      });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.reload();
  }

  open(row: Holding): void {
    this.router.navigate(['/investments', row.id]);
  }
}
