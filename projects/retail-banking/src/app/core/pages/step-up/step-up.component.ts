import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnalyticsService } from 'analytics-sdk';
import { AuthService, MfaChallenge, MfaChannel, MfaService } from 'auth';

@Component({
  selector: 'bk-step-up',
  templateUrl: './step-up.component.html',
  styleUrls: ['./step-up.component.scss'],
})
export class StepUpComponent implements OnInit {
  readonly form: FormGroup;
  channels: MfaChannel[] = [];
  challenge: MfaChallenge | null = null;
  sending = false;
  error: string | null = null;

  constructor(
    fb: FormBuilder,
    private readonly mfa: MfaService,
    private readonly auth: AuthService,
    private readonly analytics: AnalyticsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.form = fb.group({
      channelId: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  ngOnInit(): void {
    this.channels = this.auth.mfaChannels;
    const preferred = this.channels[0];
    if (preferred) {
      this.form.patchValue({ channelId: preferred.id });
    }
    this.analytics.track('mfa_prompted', { surface: 'step-up' });
  }

  send(): void {
    const channelId = this.form.value.channelId;
    if (!channelId) {
      return;
    }
    this.sending = true;
    this.mfa.start(channelId).subscribe({
      next: (challenge) => {
        this.challenge = challenge;
        this.sending = false;
      },
      error: () => {
        this.error = 'We could not send that code.';
        this.sending = false;
      },
    });
  }

  async verify(): Promise<void> {
    if (this.form.invalid || !this.challenge) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.auth.completeMfa({
        channelId: this.form.value.channelId,
        code: this.form.value.code,
        transactionId: this.challenge.transactionId,
      });
      this.analytics.track('mfa_satisfied', { surface: 'step-up' });
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      await this.router.navigateByUrl(returnUrl);
    } catch {
      this.error = 'That code was not accepted.';
    }
  }
}
