import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AnalyticsService } from 'analytics-sdk';
import { AuthService } from 'auth';

@Component({
  selector: 'bk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly form: FormGroup;
  submitting = false;
  error: string | null = null;

  constructor(
    fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly analytics: AnalyticsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberDevice: [false],
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = null;
    this.analytics.track('form_submit', { form: 'login' });

    try {
      const session = await this.auth.establishSession({
        username: this.form.value.username,
        password: this.form.value.password,
        deviceId: this.deviceId(),
      });

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      if (!session.mfaSatisfied) {
        this.analytics.track('mfa_prompted', { form: 'login' });
        await this.router.navigate(['/step-up'], { queryParams: { returnUrl } });
        return;
      }

      await this.router.navigateByUrl(returnUrl);
    } catch {
      this.error = 'We could not sign you in. Check your details and try again.';
      this.analytics.track('form_error', { form: 'login' });
    } finally {
      this.submitting = false;
    }
  }

  private deviceId(): string {
    const existing = window.localStorage.getItem('nw.device');
    if (existing) {
      return existing;
    }
    const minted = 'd-' + Math.random().toString(36).slice(2, 12);
    window.localStorage.setItem('nw.device', minted);
    return minted;
  }
}
