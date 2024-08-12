import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Card } from '../../cards.model';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'bk-cards-detail',
  templateUrl: './cards-detail.component.html',
  styleUrls: ['./cards-detail.component.scss'],
})
export class CardsDetailComponent implements OnInit, OnDestroy {
  card: Card | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Cards', route: '/cards' },
    { label: 'Detail', route: '/cards' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: CardsService,
    private readonly dialogs: DialogService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => this.service.get(params.get('id') || '')),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (result) => {
          this.card = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That card could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/cards']);
  }
}
