import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent, ConfirmDialogData } from './components/confirm-dialog/confirm-dialog.component';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  width?: string;
}

/**
 * Thin wrapper over MatDialog so feature teams do not configure panel
 * classes and sizing by hand.
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  confirm(options: ConfirmOptions): Observable<boolean | undefined> {
    const ref: MatDialogRef<ConfirmDialogComponent, boolean> = this.dialog.open(ConfirmDialogComponent, {
      width: options.width || '440px',
      panelClass: ['bk-dialog-panel', 'bk-confirm-dialog-panel'],
      autoFocus: false,
      data: {
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel || 'Confirm',
        cancelLabel: options.cancelLabel || 'Cancel',
      } as ConfirmDialogData,
    });

    return ref.afterClosed();
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
