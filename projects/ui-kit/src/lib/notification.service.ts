import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type NotificationTone = 'info' | 'success' | 'warn' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  notify(message: string, tone: NotificationTone = 'info'): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: tone === 'error' ? 8000 : 4000,
      panelClass: ['bk-snack', 'bk-snack--' + tone],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  error(message: string): void {
    this.notify(message, 'error');
  }

  success(message: string): void {
    this.notify(message, 'success');
  }
}
