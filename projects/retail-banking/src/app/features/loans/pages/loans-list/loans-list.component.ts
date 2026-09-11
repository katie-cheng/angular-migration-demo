import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Loan } from '../../loans.model';
import { LoansService } from '../../loans.service';

@Component({
  selector: 'bk-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss'],
})
export class LoansListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  readonly displayedColumns = ['product', 'outstanding', 'rate', 'nextPaymentOn'];
  readonly search = new FormControl('');

  rows: Loan[] = [];
  total = 0;
  page = 1;
  pageSize = 25;
  loading = false;
  error: string | null = null;

  private readonly destroyed$ = new Subject<void>();

  constructor(private readonly service: LoansService, private readonly router: Router) {}

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
          this.error = 'We could not load loans right now.';
          this.loading = false;
        },
      });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.reload();
  }

  open(row: Loan): void {
    this.router.navigate(['/loans', row.id]);
  }
}
