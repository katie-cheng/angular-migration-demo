import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bk-not-entitled',
  template: `
    <div class="not-entitled bk-col bk-justify-center bk-items-center bk-gap-12px bk-fill">
      <mat-icon class="not-entitled__icon">lock</mat-icon>
      <h2>You do not have access to this area</h2>
      <p *ngIf="required">Access requires the {{ required }} entitlement.</p>
      <a mat-raised-button color="primary" routerLink="/dashboard">Back to dashboard</a>
    </div>
  `,
  styles: [
    `
      .not-entitled {
        min-height: 60vh;
        text-align: center;
      }
      .not-entitled__icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        color: #98a2b3;
      }
    `,
  ],
})
export class NotEntitledComponent {
  readonly required = this.route.snapshot.queryParamMap.get('need');

  constructor(private readonly route: ActivatedRoute) {}
}
