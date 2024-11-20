import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Preference } from '../../profile-settings.model';
import { ProfileSettingsService } from '../../profile-settings.service';

@Component({
  selector: 'bk-profile-settings-detail',
  templateUrl: './profile-settings-detail.component.html',
  styleUrls: ['./profile-settings-detail.component.scss'],
})
export class ProfileSettingsDetailComponent implements OnInit, OnDestroy {
  preference: Preference | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Profile Settings', route: '/profile-settings' },
    { label: 'Detail', route: '/profile-settings' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: ProfileSettingsService,
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
          this.preference = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That preference could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/profile-settings']);
  }

  edit(): void {
    this.router.navigate(['/profile-settings', this.preference?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove preference?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.preference) {
          this.service.remove(this.preference.id).subscribe(() => this.back());
        }
      });
  }
}
