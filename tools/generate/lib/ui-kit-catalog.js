'use strict';

// Catalogue of the Northwind Retail design-system components.
// Each entry describes a bank-branded wrapper around an Angular Material
// component (or a pure presentational component built from design tokens).
//
// inputs: [name, tsType, defaultValue]
// mat:    Angular Material modules the component template needs
// tpl:    component template
// scss:   component stylesheet

const C = [
  {
    name: 'button',
    mat: ['MatButtonModule', 'MatIconModule'],
    inputs: [['variant', "'primary' | 'secondary' | 'ghost' | 'danger'", "'primary'"], ['disabled', 'boolean', 'false'], ['icon', 'string | null', 'null'], ['loading', 'boolean', 'false']],
    outputs: ['pressed'],
    tpl: `<button mat-raised-button
        class="bk-button bk-button--{{ variant }}"
        [class.bk-button--loading]="loading"
        [disabled]="disabled || loading"
        (click)="onClick($event)">
  <mat-icon *ngIf="icon" class="bk-button__icon">{{ icon }}</mat-icon>
  <ng-content></ng-content>
</button>`,
    scss: `.bk-button {
  font-family: var(--bk-font-body);
  letter-spacing: 0.2px;

  // Design-system paint applied straight onto the Material internals.
  .mat-button-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    line-height: 20px;
  }

  &--primary .mat-button-wrapper { color: #ffffff; }
  &--ghost { background: transparent; }
  &--danger { background: #a3232b; }
  &--loading .mat-button-wrapper { opacity: 0.6; }
}`,
    body: `onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.stopPropagation();
      return;
    }
    this.pressed.emit(event);
  }`,
  },
  {
    name: 'icon-button',
    mat: ['MatButtonModule', 'MatIconModule', 'MatTooltipModule'],
    inputs: [['icon', 'string', "'more_vert'"], ['label', 'string', "''"], ['disabled', 'boolean', 'false']],
    outputs: ['pressed'],
    tpl: `<button mat-icon-button class="bk-icon-button" [attr.aria-label]="label"
        [matTooltip]="label" [disabled]="disabled" (click)="pressed.emit($event)">
  <mat-icon>{{ icon }}</mat-icon>
</button>`,
    scss: `.bk-icon-button {
  .mat-button-wrapper { line-height: 0; }
  .mat-button-focus-overlay { background-color: rgba(0, 51, 102, 0.08); }
}`,
  },
  {
    name: 'form-field',
    mat: ['MatFormFieldModule', 'MatInputModule'],
    inputs: [['label', 'string', "''"], ['hint', 'string', "''"], ['error', 'string | null', 'null'], ['required', 'boolean', 'false']],
    tpl: `<mat-form-field appearance="legacy" class="bk-form-field" [class.bk-form-field--invalid]="!!error">
  <mat-label>{{ label }}<span *ngIf="required" class="bk-form-field__req">*</span></mat-label>
  <ng-content></ng-content>
  <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
  <mat-error *ngIf="error">{{ error }}</mat-error>
</mat-form-field>`,
    scss: `.bk-form-field {
  width: 100%;

  .mat-form-field-underline { background-color: #9aa5b1; }
  .mat-form-field-ripple { background-color: var(--bk-color-primary); }
  .mat-form-field-flex { padding-top: 4px; }
  .mat-form-field-infix { border-top: 0.6em solid transparent; }
  .mat-form-field-label { color: #52606d; }

  &--invalid .mat-form-field-underline { background-color: #a3232b; }
  &__req { color: #a3232b; margin-left: 2px; }
}`,
  },
  {
    name: 'text-input',
    mat: ['MatFormFieldModule', 'MatInputModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['placeholder', 'string', "''"], ['maxLength', 'number', '120'], ['disabled', 'boolean', 'false']],
    tpl: `<mat-form-field appearance="legacy" class="bk-text-input">
  <mat-label>{{ label }}</mat-label>
  <input matInput [formControl]="control" [placeholder]="placeholder" [maxlength]="maxLength" />
</mat-form-field>`,
    scss: `.bk-text-input {
  .mat-form-field-underline { height: 1px; }
  .mat-input-element { caret-color: var(--bk-color-primary); }
}`,
  },
  {
    name: 'number-input',
    mat: ['MatFormFieldModule', 'MatInputModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['min', 'number', '0'], ['max', 'number', '1000000'], ['step', 'number', '1']],
    tpl: `<mat-form-field appearance="legacy" class="bk-number-input">
  <mat-label>{{ label }}</mat-label>
  <input matInput type="number" [formControl]="control" [min]="min" [max]="max" [step]="step" />
</mat-form-field>`,
    scss: `.bk-number-input .mat-form-field-flex { align-items: baseline; }`,
  },
  {
    name: 'select',
    mat: ['MatFormFieldModule', 'MatSelectModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['options', 'ReadonlyArray<{ value: string; label: string }>', '[]'], ['disabled', 'boolean', 'false']],
    outputs: ['selectionChanged'],
    tpl: `<mat-form-field appearance="legacy" class="bk-select">
  <mat-label>{{ label }}</mat-label>
  <mat-select [formControl]="control" [disabled]="disabled"
              (selectionChange)="selectionChanged.emit($event.value)">
    <mat-option *ngFor="let option of options" [value]="option.value">{{ option.label }}</mat-option>
  </mat-select>
</mat-form-field>`,
    scss: `.bk-select {
  .mat-select-arrow { color: var(--bk-color-primary); border-width: 5px 5px 0; }
  .mat-select-value-text { font-weight: 500; }
  .mat-select-panel { border-radius: 2px; }
}`,
  },
  {
    name: 'multi-select',
    mat: ['MatFormFieldModule', 'MatSelectModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['options', 'ReadonlyArray<{ value: string; label: string }>', '[]']],
    tpl: `<mat-form-field appearance="legacy" class="bk-multi-select">
  <mat-label>{{ label }}</mat-label>
  <mat-select [formControl]="control" multiple>
    <mat-option *ngFor="let option of options" [value]="option.value">{{ option.label }}</mat-option>
  </mat-select>
</mat-form-field>`,
    scss: `.bk-multi-select .mat-select-arrow { margin: 0 4px; }`,
  },
  {
    name: 'autocomplete',
    mat: ['MatFormFieldModule', 'MatInputModule', 'MatAutocompleteModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['options', 'ReadonlyArray<string>', '[]']],
    tpl: `<mat-form-field appearance="legacy" class="bk-autocomplete">
  <mat-label>{{ label }}</mat-label>
  <input matInput [formControl]="control" [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of options" [value]="option">{{ option }}</mat-option>
  </mat-autocomplete>
</mat-form-field>`,
    scss: `.bk-autocomplete .mat-autocomplete-panel { max-height: 280px; }`,
  },
  {
    name: 'checkbox',
    mat: ['MatCheckboxModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['disabled', 'boolean', 'false']],
    outputs: ['changed'],
    tpl: `<mat-checkbox class="bk-checkbox" [formControl]="control" [disabled]="disabled"
              (change)="changed.emit($event.checked)">{{ label }}</mat-checkbox>`,
    scss: `.bk-checkbox {
  .mat-checkbox-frame { border-color: #7b8794; border-width: 1px; border-radius: 2px; }
  .mat-checkbox-checkmark-path { stroke: #ffffff !important; }
  .mat-checkbox-label { font-size: 14px; }
}`,
  },
  {
    name: 'radio-group',
    mat: ['MatRadioModule'],
    forms: true,
    inputs: [['legend', 'string', "''"], ['options', 'ReadonlyArray<{ value: string; label: string }>', '[]']],
    tpl: `<fieldset class="bk-radio-group">
  <legend>{{ legend }}</legend>
  <mat-radio-group [formControl]="control">
    <mat-radio-button *ngFor="let option of options" [value]="option.value">{{ option.label }}</mat-radio-button>
  </mat-radio-group>
</fieldset>`,
    scss: `.bk-radio-group {
  border: 0;
  .mat-radio-outer-circle { border-color: #7b8794; }
  .mat-radio-label-content { padding-left: 6px; }
}`,
  },
  {
    name: 'slide-toggle',
    mat: ['MatSlideToggleModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['disabled', 'boolean', 'false']],
    tpl: `<mat-slide-toggle class="bk-slide-toggle" [formControl]="control" [disabled]="disabled">{{ label }}</mat-slide-toggle>`,
    scss: `.bk-slide-toggle {
  .mat-slide-toggle-bar { background-color: #cbd2d9; height: 16px; border-radius: 8px; }
  .mat-slide-toggle-thumb { height: 18px; width: 18px; }
  &.mat-checked .mat-slide-toggle-bar { background-color: rgba(0, 51, 102, 0.4); }
}`,
  },
  {
    name: 'slider',
    mat: ['MatSliderModule'],
    inputs: [['min', 'number', '0'], ['max', 'number', '100'], ['value', 'number', '0'], ['label', 'string', "''"]],
    outputs: ['valueChanged'],
    tpl: `<div class="bk-slider">
  <span class="bk-slider__label">{{ label }}</span>
  <mat-slider [min]="min" [max]="max" [value]="value"
              (change)="valueChanged.emit($event.value ?? 0)"></mat-slider>
</div>`,
    scss: `.bk-slider .mat-slider-track-fill { background-color: var(--bk-color-primary); }`,
  },
  {
    name: 'datepicker',
    mat: ['MatFormFieldModule', 'MatInputModule', 'MatDatepickerModule', 'MatNativeDateModule'],
    forms: true,
    inputs: [['label', 'string', "''"], ['minDate', 'Date | null', 'null'], ['maxDate', 'Date | null', 'null']],
    tpl: `<mat-form-field appearance="legacy" class="bk-datepicker">
  <mat-label>{{ label }}</mat-label>
  <input matInput [matDatepicker]="picker" [formControl]="control" [min]="minDate" [max]="maxDate" />
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>`,
    scss: `.bk-datepicker {
  .mat-datepicker-toggle .mat-icon-button { width: 32px; height: 32px; }
  .mat-form-field-suffix { top: 0.2em; }
}`,
  },
  {
    name: 'date-range',
    mat: ['MatFormFieldModule', 'MatInputModule', 'MatDatepickerModule', 'MatNativeDateModule'],
    inputs: [['label', 'string', "'Date range'"]],
    tpl: `<mat-form-field appearance="legacy" class="bk-date-range">
  <mat-label>{{ label }}</mat-label>
  <mat-date-range-input [rangePicker]="rangePicker">
    <input matStartDate placeholder="Start" />
    <input matEndDate placeholder="End" />
  </mat-date-range-input>
  <mat-datepicker-toggle matSuffix [for]="rangePicker"></mat-datepicker-toggle>
  <mat-date-range-picker #rangePicker></mat-date-range-picker>
</mat-form-field>`,
    scss: `.bk-date-range .mat-date-range-input-separator { color: #52606d; }`,
  },
  {
    name: 'tabs',
    mat: ['MatTabsModule'],
    inputs: [['tabs', 'ReadonlyArray<string>', '[]'], ['activeIndex', 'number', '0']],
    outputs: ['tabChanged'],
    tpl: `<mat-tab-group class="bk-tabs" [selectedIndex]="activeIndex" (selectedIndexChange)="tabChanged.emit($event)">
  <mat-tab *ngFor="let tab of tabs" [label]="tab"></mat-tab>
</mat-tab-group>`,
    scss: `.bk-tabs {
  .mat-tab-label { min-width: 120px; opacity: 1; font-weight: 500; }
  .mat-tab-label-active { color: var(--bk-color-primary); }
  .mat-ink-bar { height: 3px; background-color: var(--bk-color-accent); }
  .mat-tab-header { border-bottom: 1px solid #e4e7eb; }
}`,
  },
  {
    name: 'table',
    mat: ['MatTableModule'],
    inputs: [['columns', 'ReadonlyArray<string>', '[]'], ['rows', 'ReadonlyArray<Record<string, unknown>>', '[]'], ['dense', 'boolean', 'false']],
    outputs: ['rowSelected'],
    tpl: `<table mat-table class="bk-table" [class.bk-table--dense]="dense" [dataSource]="dataSource">
  <ng-container *ngFor="let column of columns" [matColumnDef]="column">
    <th mat-header-cell *matHeaderCellDef>{{ column }}</th>
    <td mat-cell *matCellDef="let row" (click)="rowSelected.emit(row)">{{ row[column] }}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="columns"></tr>
  <tr mat-row *matRowDef="let row; columns: columns"></tr>
</table>`,
    scss: `.bk-table {
  width: 100%;

  .mat-table { background: transparent; }
  .mat-header-row { height: 44px; }
  .mat-row { height: 52px; border-bottom: 1px solid #f5f7fa; }
  .mat-cell { font-size: 14px; color: #1f2933; }
  .mat-header-cell { color: #52606d; text-transform: uppercase; font-size: 11px; }

  &--dense .mat-row { height: 40px; }
}`,
    body: `dataSource: Record<string, unknown>[] = [];

  ngOnChanges(): void {
    this.dataSource = this.rows.slice();
  }`,
  },
  {
    name: 'paginator',
    mat: ['MatPaginatorModule'],
    inputs: [['length', 'number', '0'], ['pageSize', 'number', '25'], ['pageSizeOptions', 'ReadonlyArray<number>', '[10, 25, 50]']],
    outputs: ['pageChanged'],
    tpl: `<mat-paginator class="bk-paginator" [length]="length" [pageSize]="pageSize"
               [pageSizeOptions]="pageSizeOptionsArray" (page)="pageChanged.emit($event.pageIndex)"></mat-paginator>`,
    scss: `.bk-paginator {
  .mat-paginator-container { min-height: 48px; padding: 0 8px; }
  .mat-paginator-page-size-label { color: #52606d; }
}`,
    body: `pageSizeOptionsArray: number[] = [10, 25, 50];

  ngOnChanges(): void {
    this.pageSizeOptionsArray = this.pageSizeOptions.slice();
  }`,
  },
  {
    name: 'sort-header',
    mat: ['MatSortModule'],
    inputs: [['label', 'string', "''"], ['active', 'boolean', 'false'], ['direction', "'asc' | 'desc'", "'asc'"]],
    outputs: ['sorted'],
    tpl: `<button class="bk-sort-header" type="button" [class.bk-sort-header--active]="active"
        (click)="sorted.emit(direction === 'asc' ? 'desc' : 'asc')">
  {{ label }}<span class="bk-sort-header__arrow">{{ direction === 'asc' ? '\\u2191' : '\\u2193' }}</span>
</button>`,
    scss: `.bk-sort-header {
  background: none;
  border: 0;
  cursor: pointer;
  color: #52606d;
  &--active { color: var(--bk-color-primary); font-weight: 600; }
}`,
  },
  {
    name: 'confirm-dialog',
    mat: ['MatDialogModule', 'MatButtonModule'],
    dialog: true,
    inputs: [],
    tpl: `<h2 mat-dialog-title class="bk-confirm-dialog__title">{{ data.title }}</h2>
<mat-dialog-content class="bk-confirm-dialog__content">{{ data.message }}</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button (click)="dialogRef.close(false)">{{ data.cancelLabel }}</button>
  <button mat-raised-button color="primary" (click)="dialogRef.close(true)">{{ data.confirmLabel }}</button>
</mat-dialog-actions>`,
    scss: `.bk-confirm-dialog__title { font-size: 18px; }

::ng-deep .bk-confirm-dialog-panel {
  .mat-dialog-container {
    padding: 20px 24px;
    border-radius: 2px;
    box-shadow: 0 8px 24px rgba(31, 41, 51, 0.24);
  }
  .mat-dialog-title { margin-bottom: 8px; }
  .mat-dialog-actions { padding-bottom: 0; }
}`,
  },
  {
    name: 'card',
    inputs: [['heading', 'string', "''"], ['subheading', 'string', "''"], ['elevated', 'boolean', 'true']],
    tpl: `<section class="bk-card" [class.bk-card--elevated]="elevated">
  <header class="bk-card__header" *ngIf="heading">
    <h3 class="bk-card__heading">{{ heading }}</h3>
    <p class="bk-card__subheading" *ngIf="subheading">{{ subheading }}</p>
  </header>
  <div class="bk-card__body"><ng-content></ng-content></div>
</section>`,
    scss: `.bk-card {
  background: #ffffff;
  border: 1px solid #e4e7eb;
  border-radius: 4px;
  padding: 16px;
  &--elevated { box-shadow: 0 1px 3px rgba(31, 41, 51, 0.12); }
  &__heading { margin: 0 0 4px; font-size: 16px; color: var(--bk-color-primary); }
  &__subheading { margin: 0; font-size: 13px; color: #52606d; }
}`,
  },
  {
    name: 'panel',
    inputs: [['title', 'string', "''"], ['tone', "'neutral' | 'info' | 'warn'", "'neutral'"]],
    tpl: `<div class="bk-panel bk-panel--{{ tone }}">
  <h4 class="bk-panel__title" *ngIf="title">{{ title }}</h4>
  <ng-content></ng-content>
</div>`,
    scss: `.bk-panel {
  padding: 12px 16px;
  border-left: 3px solid #cbd2d9;
  &--info { border-left-color: var(--bk-color-primary); background: #f0f4f8; }
  &--warn { border-left-color: #c99a2e; background: #fffaeb; }
}`,
  },
  {
    name: 'chip-list',
    mat: ['MatChipsModule'],
    inputs: [['chips', 'ReadonlyArray<string>', '[]'], ['removable', 'boolean', 'false']],
    outputs: ['removed'],
    tpl: `<mat-chip-list class="bk-chip-list">
  <mat-chip *ngFor="let chip of chips" [removable]="removable" (removed)="removed.emit(chip)">
    {{ chip }}
    <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
  </mat-chip>
</mat-chip-list>`,
    mat2: ['MatIconModule'],
    scss: `.bk-chip-list .mat-chip { border-radius: 2px; font-size: 12px; }`,
  },
  {
    name: 'badge',
    inputs: [['count', 'number', '0'], ['tone', "'neutral' | 'alert'", "'neutral'"]],
    tpl: `<span class="bk-badge bk-badge--{{ tone }}" *ngIf="count > 0">{{ count > 99 ? '99+' : count }}</span>`,
    scss: `.bk-badge {
  display: inline-block;
  min-width: 18px;
  padding: 1px 5px;
  border-radius: 9px;
  font-size: 11px;
  text-align: center;
  background: #cbd2d9;
  &--alert { background: #a3232b; color: #ffffff; }
}`,
  },
  {
    name: 'avatar',
    inputs: [['name', 'string', "''"], ['size', 'number', '32']],
    tpl: `<span class="bk-avatar" [style.width.px]="size" [style.height.px]="size"
      [style.fontSize.px]="size / 2.6">{{ initials }}</span>`,
    scss: `.bk-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bk-color-primary);
  color: #ffffff;
}`,
    body: `get initials(): string {
    return this.name
      .split(' ')
      .filter((part) => part.length > 0)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }`,
  },
  {
    name: 'progress-bar',
    mat: ['MatProgressBarModule'],
    inputs: [['value', 'number', '0'], ['label', 'string', "''"]],
    tpl: `<div class="bk-progress-bar">
  <span class="bk-progress-bar__label" *ngIf="label">{{ label }}</span>
  <mat-progress-bar mode="determinate" [value]="value"></mat-progress-bar>
</div>`,
    scss: `.bk-progress-bar .mat-progress-bar-fill::after { background-color: var(--bk-color-accent); }`,
  },
  {
    name: 'spinner',
    mat: ['MatProgressSpinnerModule'],
    inputs: [['diameter', 'number', '32'], ['message', 'string', "''"]],
    tpl: `<div class="bk-spinner">
  <mat-spinner [diameter]="diameter"></mat-spinner>
  <span class="bk-spinner__message" *ngIf="message">{{ message }}</span>
</div>`,
    scss: `.bk-spinner { display: inline-flex; align-items: center; gap: 8px; }`,
  },
  {
    name: 'stepper',
    mat: ['MatStepperModule'],
    inputs: [['steps', 'ReadonlyArray<string>', '[]'], ['selectedIndex', 'number', '0']],
    tpl: `<mat-horizontal-stepper class="bk-stepper" [selectedIndex]="selectedIndex" [linear]="false">
  <mat-step *ngFor="let step of steps" [label]="step"></mat-step>
</mat-horizontal-stepper>`,
    scss: `.bk-stepper .mat-step-header .mat-step-icon-selected { background-color: var(--bk-color-primary); }`,
  },
  {
    name: 'expansion-panel',
    mat: ['MatExpansionModule'],
    inputs: [['heading', 'string', "''"], ['expanded', 'boolean', 'false']],
    tpl: `<mat-expansion-panel class="bk-expansion-panel" [expanded]="expanded">
  <mat-expansion-panel-header><mat-panel-title>{{ heading }}</mat-panel-title></mat-expansion-panel-header>
  <ng-content></ng-content>
</mat-expansion-panel>`,
    scss: `.bk-expansion-panel .mat-expansion-panel-header { height: 48px; }`,
  },
  {
    name: 'menu',
    mat: ['MatMenuModule', 'MatButtonModule', 'MatIconModule'],
    inputs: [['items', 'ReadonlyArray<{ id: string; label: string }>', '[]'], ['triggerLabel', 'string', "'Actions'"]],
    outputs: ['itemSelected'],
    tpl: `<button mat-button class="bk-menu__trigger" [matMenuTriggerFor]="menu">{{ triggerLabel }}</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item *ngFor="let item of items" (click)="itemSelected.emit(item.id)">{{ item.label }}</button>
</mat-menu>`,
    scss: `.bk-menu__trigger .mat-button-wrapper { font-weight: 500; }`,
  },
  {
    name: 'toolbar',
    mat: ['MatToolbarModule'],
    inputs: [['heading', 'string', "''"]],
    tpl: `<mat-toolbar class="bk-toolbar">
  <span class="bk-toolbar__heading">{{ heading }}</span>
  <span class="bk-toolbar__spacer"></span>
  <ng-content></ng-content>
</mat-toolbar>`,
    scss: `.bk-toolbar {
  background: var(--bk-color-primary);
  color: #ffffff;
  &__spacer { flex: 1 1 auto; }
}`,
  },
  {
    name: 'breadcrumbs',
    inputs: [['crumbs', 'ReadonlyArray<{ label: string; route: string }>', '[]']],
    outputs: ['navigated'],
    tpl: `<nav class="bk-breadcrumbs" aria-label="Breadcrumb">
  <span *ngFor="let crumb of crumbs; let last = last">
    <a class="bk-breadcrumbs__link" (click)="navigated.emit(crumb.route)">{{ crumb.label }}</a>
    <span class="bk-breadcrumbs__sep" *ngIf="!last">/</span>
  </span>
</nav>`,
    scss: `.bk-breadcrumbs { font-size: 13px; &__sep { margin: 0 6px; color: #9aa5b1; } }`,
  },
  {
    name: 'alert-banner',
    mat: ['MatIconModule'],
    inputs: [['tone', "'info' | 'success' | 'warn' | 'error'", "'info'"], ['message', 'string', "''"], ['dismissible', 'boolean', 'false']],
    outputs: ['dismissed'],
    tpl: `<div class="bk-alert-banner bk-alert-banner--{{ tone }}" role="status">
  <mat-icon class="bk-alert-banner__icon">{{ iconName }}</mat-icon>
  <span class="bk-alert-banner__message">{{ message }}</span>
  <button *ngIf="dismissible" class="bk-alert-banner__close" type="button" (click)="dismissed.emit()">&times;</button>
</div>`,
    scss: `.bk-alert-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 3px;
  &--info { background: #f0f4f8; }
  &--success { background: #e3f9e5; }
  &--warn { background: #fffaeb; }
  &--error { background: #ffe3e3; }
  &__close { margin-left: auto; border: 0; background: none; cursor: pointer; font-size: 18px; }
}`,
    body: `get iconName(): string {
    switch (this.tone) {
      case 'success':
        return 'check_circle';
      case 'warn':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }`,
  },
  {
    name: 'empty-state',
    inputs: [['heading', 'string', "'Nothing here yet'"], ['message', 'string', "''"], ['actionLabel', 'string', "''"]],
    outputs: ['actioned'],
    tpl: `<div class="bk-empty-state">
  <h4 class="bk-empty-state__heading">{{ heading }}</h4>
  <p class="bk-empty-state__message">{{ message }}</p>
  <button *ngIf="actionLabel" type="button" class="bk-empty-state__action" (click)="actioned.emit()">{{ actionLabel }}</button>
</div>`,
    scss: `.bk-empty-state { text-align: center; padding: 32px 16px; color: #52606d; }`,
  },
  {
    name: 'currency-amount',
    inputs: [['amount', 'number', '0'], ['currency', 'string', "'USD'"], ['signed', 'boolean', 'false']],
    tpl: `<span class="bk-currency-amount" [class.bk-currency-amount--negative]="amount < 0">{{ formatted }}</span>`,
    scss: `.bk-currency-amount {
  font-variant-numeric: tabular-nums;
  &--negative { color: #a3232b; }
}`,
    body: `get formatted(): string {
    const prefix = this.signed && this.amount > 0 ? '+' : '';
    return prefix + new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currency }).format(this.amount);
  }`,
  },
  {
    name: 'account-tile',
    inputs: [['accountName', 'string', "''"], ['accountNumber', 'string', "''"], ['balance', 'number', '0'], ['available', 'number', '0']],
    outputs: ['opened'],
    tpl: `<button type="button" class="bk-account-tile" (click)="opened.emit()">
  <span class="bk-account-tile__name">{{ accountName }}</span>
  <span class="bk-account-tile__number">{{ maskedNumber }}</span>
  <span class="bk-account-tile__balance">{{ balance | currency }}</span>
  <span class="bk-account-tile__available">{{ available | currency }} available</span>
</button>`,
    scss: `.bk-account-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e4e7eb;
  background: #ffffff;
  cursor: pointer;
  &__balance { font-size: 20px; font-weight: 600; }
  &__number { font-size: 12px; color: #7b8794; }
}`,
    body: `get maskedNumber(): string {
    return '\\u2022\\u2022\\u2022\\u2022 ' + this.accountNumber.slice(-4);
  }`,
  },
  {
    name: 'transaction-row',
    inputs: [['description', 'string', "''"], ['postedAt', 'string', "''"], ['amount', 'number', '0'], ['pending', 'boolean', 'false']],
    tpl: `<div class="bk-transaction-row" [class.bk-transaction-row--pending]="pending">
  <span class="bk-transaction-row__description">{{ description }}</span>
  <span class="bk-transaction-row__date">{{ postedAt }}</span>
  <span class="bk-transaction-row__amount">{{ amount | currency }}</span>
</div>`,
    scss: `.bk-transaction-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f7fa;
  &--pending { opacity: 0.7; font-style: italic; }
  &__amount { margin-left: auto; font-variant-numeric: tabular-nums; }
}`,
  },
  {
    name: 'status-pill',
    inputs: [['status', 'string', "'pending'"]],
    tpl: `<span class="bk-status-pill bk-status-pill--{{ status }}">{{ status | titlecase }}</span>`,
    scss: `.bk-status-pill {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  text-transform: uppercase;
  background: #e4e7eb;
  &--posted, &--settled, &--approved { background: #e3f9e5; }
  &--failed, &--declined { background: #ffe3e3; }
}`,
  },
  {
    name: 'nav-rail',
    mat: ['MatIconModule'],
    inputs: [['items', 'ReadonlyArray<{ id: string; label: string; icon: string }>', '[]'], ['activeId', 'string', "''"]],
    outputs: ['navigated'],
    tpl: `<nav class="bk-nav-rail">
  <button *ngFor="let item of items" type="button" class="bk-nav-rail__item"
          [class.bk-nav-rail__item--active]="item.id === activeId" (click)="navigated.emit(item.id)">
    <mat-icon>{{ item.icon }}</mat-icon>
    <span class="bk-nav-rail__label">{{ item.label }}</span>
  </button>
</nav>`,
    scss: `.bk-nav-rail {
  display: flex;
  flex-direction: column;
  &__item { display: flex; align-items: center; gap: 10px; border: 0; background: none; padding: 10px 14px; cursor: pointer; }
  &__item--active { background: #f0f4f8; color: var(--bk-color-primary); font-weight: 600; }
}`,
  },
  {
    name: 'key-value-list',
    inputs: [['entries', 'ReadonlyArray<{ key: string; value: string }>', '[]'], ['columns', 'number', '1']],
    tpl: `<dl class="bk-key-value-list" [style.gridTemplateColumns]="'repeat(' + columns + ', minmax(0, 1fr))'">
  <div class="bk-key-value-list__entry" *ngFor="let entry of entries">
    <dt>{{ entry.key }}</dt>
    <dd>{{ entry.value }}</dd>
  </div>
</dl>`,
    scss: `.bk-key-value-list {
  display: grid;
  gap: 8px 24px;
  dt { font-size: 12px; color: #7b8794; margin: 0; }
  dd { margin: 0; font-size: 14px; }
}`,
  },
  {
    name: 'section-heading',
    inputs: [['heading', 'string', "''"], ['actionLabel', 'string', "''"]],
    outputs: ['actioned'],
    tpl: `<div class="bk-section-heading">
  <h2>{{ heading }}</h2>
  <button *ngIf="actionLabel" type="button" (click)="actioned.emit()">{{ actionLabel }}</button>
</div>`,
    scss: `.bk-section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  h2 { font-size: 18px; margin: 0; }
}`,
  },
  {
    name: 'amount-input',
    mat: ['MatFormFieldModule', 'MatInputModule'],
    forms: true,
    inputs: [['label', 'string', "'Amount'"], ['currency', 'string', "'USD'"]],
    tpl: `<mat-form-field appearance="legacy" class="bk-amount-input">
  <mat-label>{{ label }}</mat-label>
  <span matPrefix class="bk-amount-input__prefix">{{ currency }}&nbsp;</span>
  <input matInput type="number" [formControl]="control" />
</mat-form-field>`,
    scss: `.bk-amount-input {
  .mat-form-field-prefix { color: #52606d; }
  .mat-form-field-flex { align-items: center; }
}`,
  },
  {
    name: 'file-upload',
    inputs: [['label', 'string', "'Upload document'"], ['accept', 'string', "'.pdf,.png,.jpg'"]],
    outputs: ['fileSelected'],
    tpl: `<label class="bk-file-upload">
  <span class="bk-file-upload__label">{{ label }}</span>
  <input type="file" [accept]="accept" (change)="onChange($event)" />
</label>`,
    scss: `.bk-file-upload { display: inline-flex; flex-direction: column; gap: 4px; font-size: 13px; }`,
    body: `onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    if (file) {
      this.fileSelected.emit(file.name);
    }
  }`,
  },
  {
    name: 'search-field',
    mat: ['MatFormFieldModule', 'MatInputModule', 'MatIconModule'],
    forms: true,
    inputs: [['placeholder', 'string', "'Search'"]],
    outputs: ['searched'],
    tpl: `<mat-form-field appearance="legacy" class="bk-search-field">
  <mat-icon matPrefix>search</mat-icon>
  <input matInput [formControl]="control" [placeholder]="placeholder"
         (keyup.enter)="searched.emit(control.value ?? '')" />
</mat-form-field>`,
    scss: `.bk-search-field .mat-form-field-underline { background-color: #cbd2d9; }`,
  },
  {
    name: 'timeline',
    inputs: [['events', 'ReadonlyArray<{ label: string; at: string; done: boolean }>', '[]']],
    tpl: `<ol class="bk-timeline">
  <li class="bk-timeline__item" *ngFor="let event of events" [class.bk-timeline__item--done]="event.done">
    <span class="bk-timeline__label">{{ event.label }}</span>
    <span class="bk-timeline__at">{{ event.at }}</span>
  </li>
</ol>`,
    scss: `.bk-timeline {
  list-style: none;
  padding-left: 16px;
  border-left: 2px solid #e4e7eb;
  &__item--done { color: #1f2933; }
}`,
  },
  {
    name: 'metric-tile',
    inputs: [['label', 'string', "''"], ['value', 'string', "''"], ['delta', 'number', '0']],
    tpl: `<div class="bk-metric-tile">
  <span class="bk-metric-tile__label">{{ label }}</span>
  <span class="bk-metric-tile__value">{{ value }}</span>
  <span class="bk-metric-tile__delta" [class.bk-metric-tile__delta--down]="delta < 0">{{ delta }}%</span>
</div>`,
    scss: `.bk-metric-tile {
  display: flex;
  flex-direction: column;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid #e4e7eb;
  &__value { font-size: 22px; font-weight: 600; }
  &__delta--down { color: #a3232b; }
}`,
  },
];

module.exports = C;
