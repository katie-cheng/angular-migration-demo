import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Conversation } from '../../support-chat.model';
import { SupportChatService } from '../../support-chat.service';

@Component({
  selector: 'bk-support-chat-detail',
  templateUrl: './support-chat-detail.component.html',
  styleUrls: ['./support-chat-detail.component.scss'],
})
export class SupportChatDetailComponent implements OnInit, OnDestroy {
  conversation: Conversation | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Support Chat', route: '/support-chat' },
    { label: 'Detail', route: '/support-chat' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: SupportChatService,
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
          this.conversation = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That conversation could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/support-chat']);
  }

  edit(): void {
    this.router.navigate(['/support-chat', this.conversation?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove conversation?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.conversation) {
          this.service.remove(this.conversation.id).subscribe(() => this.back());
        }
      });
  }
}
