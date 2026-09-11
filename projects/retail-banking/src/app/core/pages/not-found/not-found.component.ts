import { Component } from '@angular/core';

@Component({
  selector: 'bk-not-found',
  template: `
    <div class="not-found bk-col bk-justify-center bk-items-center bk-gap-12px bk-fill">
      <h1 class="not-found__code">404</h1>
      <p>We could not find that page.</p>
      <a mat-raised-button color="primary" routerLink="/dashboard">Back to dashboard</a>
    </div>
  `,
  styles: [
    `
          .not-found {
            min-height: 60vh;
          }
          .not-found__code {
            font-size: 56px;
            margin: 0;
            color: var(--bk-color-primary);
          }
        `,
  ],
})
export class NotFoundComponent {}
