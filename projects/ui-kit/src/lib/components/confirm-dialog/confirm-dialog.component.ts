import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
}

@Component({
  selector: 'bk-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ConfirmDialogComponent {

  constructor(
    readonly dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData,
  ) {}
}
