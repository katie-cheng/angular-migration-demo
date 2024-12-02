import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Reward } from '../../rewards.model';
import { RewardsService } from '../../rewards.service';

@Component({
  selector: 'bk-rewards-detail',
  templateUrl: './rewards-detail.component.html',
  styleUrls: ['./rewards-detail.component.scss'],
})
export class RewardsDetailComponent implements OnInit, OnDestroy {
  reward: Reward | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Rewards', route: '/rewards' },
    { label: 'Detail', route: '/rewards' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: RewardsService,
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
          this.reward = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That reward could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/rewards']);
  }
}
