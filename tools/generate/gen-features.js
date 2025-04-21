'use strict';

/**
 * Generates the lazy-loaded feature areas of the retail-banking app.
 *
 * Run with: node tools/generate/gen-features.js
 */
const { write, rmrf, pascal, camel, title, rng } = require('./lib/util');
const { FEATURES } = require('./lib/feature-catalog');

const APP = 'projects/retail-banking/src/app';

function modelFile(feature) {
  const Entity = pascal(feature.entity);
  const fields = feature.fields
    .map((field) => {
      const type =
        field.type === 'money' || field.type === 'number'
          ? 'number'
          : field.type === 'status'
          ? Entity + 'Status'
          : 'string';
      return '  ' + field.name + ': ' + type + ';';
    })
    .join('\n');

  const hasStatus = feature.fields.some((f) => f.type === 'status');
  const statusType = hasStatus
    ? "export type " + Entity + "Status = 'active' | 'pending' | 'complete' | 'failed';\n\n"
    : '';

  return (
    statusType +
    'export interface ' +
    Entity +
    ' {\n  id: string;\n' +
    fields +
    '\n}\n\nexport interface ' +
    Entity +
    'Page {\n  items: ' +
    Entity +
    '[];\n  total: number;\n  page: number;\n  pageSize: number;\n}\n'
  );
}

function serviceFile(feature) {
  const Entity = pascal(feature.entity);
  const Service = pascal(feature.name) + 'Service';
  return `import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ${Entity}, ${Entity}Page } from './${feature.name}.model';

const BASE = '/api/${feature.name}';

@Injectable()
export class ${Service} {
  private cached$: Observable<${Entity}Page> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<${Entity}Page> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<${Entity}Page>(BASE, { params });
  }

  first(): Observable<${Entity}Page> {
    if (!this.cached\$) {
      this.cached\$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached\$;
  }

  get(id: string): Observable<${Entity}> {
    return this.http.get<${Entity}>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<${Entity}>): Observable<${Entity}> {
    this.cached\$ = null;
    return payload.id
      ? this.http.put<${Entity}>(BASE + '/' + payload.id, payload)
      : this.http.post<${Entity}>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached\$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
`;
}

function cellFor(field, varName) {
  if (field.type === 'money') {
    return '{{ ' + varName + '.' + field.name + " | currency:'GBP' }}";
  }
  if (field.type === 'date') {
    return '{{ ' + varName + '.' + field.name + " | date:'mediumDate' }}";
  }
  if (field.type === 'status') {
    return '<bk-status-pill [status]="' + varName + '.' + field.name + '"></bk-status-pill>';
  }
  return '{{ ' + varName + '.' + field.name + ' }}';
}

function listTemplate(feature) {
  const entity = camel(feature.entity);
  const columns = feature.fields.map((f) => f.name);
  const headerCells = feature.fields
    .map(
      (field) => `    <ng-container matColumnDef="${field.name}">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>${field.label}</th>
      <td mat-cell *matCellDef="let ${entity}">${cellFor(field, entity)}</td>
    </ng-container>`
    )
    .join('\n\n');

  return `<section class="${feature.name}-list" fxLayout="column" fxLayoutGap="16px">
  <header class="${feature.name}-list__header"
          fxLayout="row"
          fxLayout.lt-md="column"
          fxLayoutAlign="space-between center"
          fxLayoutAlign.lt-md="start stretch"
          fxLayoutGap="12px">
    <div fxLayout="column" fxLayoutGap="4px">
      <h1 class="${feature.name}-list__title">${title(feature.name)}</h1>
      <p class="${feature.name}-list__subtitle" fxHide.lt-sm>${feature.summary}</p>
    </div>

    <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="8px" fxFlex.lt-md="100">
      <mat-form-field appearance="legacy" class="${feature.name}-list__search" fxFlex="240px" fxFlex.lt-md="auto">
        <mat-label>Search</mat-label>
        <input matInput [formControl]="search" autocomplete="off" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
${
  feature.form
    ? `      <button mat-raised-button color="primary" (click)="create()" fxHide.lt-sm>
        <mat-icon>add</mat-icon>
        New
      </button>
      <button mat-mini-fab color="primary" (click)="create()" fxShow.lt-sm fxHide>
        <mat-icon>add</mat-icon>
      </button>`
    : `      <button mat-stroked-button (click)="reload()">
        <mat-icon>refresh</mat-icon>
        Refresh
      </button>`
}
    </div>
  </header>

  <bk-alert-banner *ngIf="error" tone="error" [message]="error"></bk-alert-banner>

  <div class="${feature.name}-list__body" fxLayout="row" fxLayout.lt-lg="column" fxLayoutGap="16px">
    <mat-card class="${feature.name}-list__table-card" fxFlex="grow">
      <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>

      <table mat-table [dataSource]="rows" matSort class="${feature.name}-list__table">
${headerCells}

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row
            *matRowDef="let row; columns: displayedColumns"
            (click)="open(row)"
            class="${feature.name}-list__row"></tr>
      </table>

      <bk-empty-state *ngIf="!loading && !rows.length"
                      heading="Nothing here yet"
                      message="${feature.summary}"></bk-empty-state>

      <mat-paginator [length]="total"
                     [pageSize]="pageSize"
                     [pageSizeOptions]="[10, 25, 50]"
                     (page)="onPage($event)"></mat-paginator>
    </mat-card>

    <aside class="${feature.name}-list__aside" fxFlex="300px" fxFlex.lt-lg="100" fxHide.lt-md>
      <bk-${feature.name}-summary [count]="total" [loading]="loading"></bk-${feature.name}-summary>
    </aside>
  </div>
</section>
`;
}

function listComponent(feature) {
  const Entity = pascal(feature.entity);
  const Service = pascal(feature.name) + 'Service';
  const Component = pascal(feature.name) + 'ListComponent';
  const columns = feature.fields.map((f) => "'" + f.name + "'").join(', ');

  return `import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { ${Entity} } from '../../${feature.name}.model';
import { ${Service} } from '../../${feature.name}.service';

@Component({
  selector: 'bk-${feature.name}-list',
  templateUrl: './${feature.name}-list.component.html',
  styleUrls: ['./${feature.name}-list.component.scss'],
})
export class ${Component} implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  readonly displayedColumns = [${columns}];
  readonly search = new FormControl('');

  rows: ${Entity}[] = [];
  total = 0;
  page = 1;
  pageSize = 25;
  loading = false;
  error: string | null = null;

  private readonly destroyed\$ = new Subject<void>();

  constructor(private readonly service: ${Service}, private readonly router: Router) {}

  ngOnInit(): void {
    this.reload();
    this.search.valueChanges
      .pipe(debounceTime(250), takeUntil(this.destroyed\$))
      .subscribe(() => {
        this.page = 1;
        this.reload();
      });
  }

  ngOnDestroy(): void {
    this.destroyed\$.next();
    this.destroyed\$.complete();
  }

  reload(): void {
    this.loading = true;
    this.error = null;
    this.service
      .list(this.page, this.pageSize)
      .pipe(takeUntil(this.destroyed\$))
      .subscribe({
        next: (result) => {
          this.rows = result.items;
          this.total = result.total;
          this.loading = false;
        },
        error: () => {
          this.error = 'We could not load ${title(feature.name).toLowerCase()} right now.';
          this.loading = false;
        },
      });
  }

  onPage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.reload();
  }

  open(row: ${Entity}): void {
    this.router.navigate(['/${feature.name}', row.id]);
  }
${
  feature.form
    ? `
  create(): void {
    this.router.navigate(['/${feature.name}', 'new']);
  }
`
    : ''
}}
`;
}

function listStyles(feature) {
  return `.${feature.name}-list {
  padding: calc(var(--bk-spacing-unit) * 3);

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    color: var(--bk-color-ink);
  }

  &__subtitle {
    margin: 0;
    color: #667085;
  }

  &__table-card {
    padding: 0;
    overflow: hidden;
  }

  &__table {
    width: 100%;
  }

  &__row {
    cursor: pointer;

    &:hover {
      background: var(--bk-color-surface-alt, #f5f7fa);
    }
  }

  // Pre-MDC Material internals; these selectors disappear in v15.
  .mat-header-cell {
    color: var(--bk-color-ink);
    font-weight: 600;
  }

  .mat-form-field-underline {
    background-color: rgba(0, 51, 102, 0.42);
  }

  .mat-paginator-container {
    min-height: 52px;
  }
}
`;
}

function detailTemplate(feature) {
  const entity = camel(feature.entity);
  const rows = feature.fields
    .map(
      (field) => `      <div class="detail-row" fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="8px">
        <span class="detail-row__label" fxFlex="180px" fxFlex.lt-sm="auto">${field.label}</span>
        <span class="detail-row__value" fxFlex>${cellFor(field, entity)}</span>
      </div>`
    )
    .join('\n');

  return `<section class="${feature.name}-detail" fxLayout="column" fxLayoutGap="16px">
  <bk-breadcrumbs [crumbs]="crumbs"></bk-breadcrumbs>

  <div *ngIf="loading" fxLayout="row" fxLayoutAlign="center center" class="${feature.name}-detail__loading">
    <mat-spinner diameter="36"></mat-spinner>
  </div>

  <ng-container *ngIf="${entity} as ${entity}">
    <mat-card class="${feature.name}-detail__card" fxLayout="column" fxLayoutGap="12px">
      <div fxLayout="row" fxLayout.lt-md="column" fxLayoutAlign="space-between start" fxLayoutGap="12px">
        <h2 class="${feature.name}-detail__title" fxFlex>${title(feature.entity)} detail</h2>
        <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="end center">
${
  feature.form
    ? `          <button mat-stroked-button (click)="edit()">Edit</button>
          <button mat-raised-button color="warn" (click)="confirmRemove()">Remove</button>`
    : `          <button mat-stroked-button (click)="back()">Back</button>`
}
        </div>
      </div>

      <mat-divider></mat-divider>

      <div class="${feature.name}-detail__rows" fxLayout="column" fxLayoutGap="8px">
${rows}
      </div>
    </mat-card>
  </ng-container>

  <bk-alert-banner *ngIf="error" tone="error" [message]="error"></bk-alert-banner>
</section>
`;
}

function detailComponent(feature) {
  const Entity = pascal(feature.entity);
  const entity = camel(feature.entity);
  const Service = pascal(feature.name) + 'Service';
  const Component = pascal(feature.name) + 'DetailComponent';

  return `import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { ${Entity} } from '../../${feature.name}.model';
import { ${Service} } from '../../${feature.name}.service';

@Component({
  selector: 'bk-${feature.name}-detail',
  templateUrl: './${feature.name}-detail.component.html',
  styleUrls: ['./${feature.name}-detail.component.scss'],
})
export class ${Component} implements OnInit, OnDestroy {
  ${entity}: ${Entity} | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: '${title(feature.name)}', route: '/${feature.name}' },
    { label: 'Detail', route: '/${feature.name}' },
  ];

  private readonly destroyed\$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: ${Service},
    private readonly dialogs: DialogService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => this.service.get(params.get('id') || '')),
        takeUntil(this.destroyed\$)
      )
      .subscribe({
        next: (result) => {
          this.${entity} = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That ${feature.entity} could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed\$.next();
    this.destroyed\$.complete();
  }

  back(): void {
    this.router.navigate(['/${feature.name}']);
  }
${
  feature.form
    ? `
  edit(): void {
    this.router.navigate(['/${feature.name}', this.${entity}?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove ${feature.entity}?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed\$))
      .subscribe((confirmed) => {
        if (confirmed && this.${entity}) {
          this.service.remove(this.${entity}.id).subscribe(() => this.back());
        }
      });
  }
`
    : ''
}}
`;
}

function detailStyles(feature) {
  return `.${feature.name}-detail {
  padding: calc(var(--bk-spacing-unit) * 3);

  &__title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  &__loading {
    padding: 48px 0;
  }

  .detail-row {
    &__label {
      color: #667085;
    }

    &__value {
      color: var(--bk-color-ink);
      font-weight: 500;
    }
  }

  .mat-card {
    padding: calc(var(--bk-spacing-unit) * 2);
  }
}
`;
}

function formTemplate(feature) {
  const inputs = feature.fields
    .filter((field) => field.type !== 'status')
    .map((field) => {
      if (field.type === 'date') {
        return `      <mat-form-field appearance="legacy" fxFlex="50" fxFlex.lt-md="100">
        <mat-label>${field.label}</mat-label>
        <input matInput [matDatepicker]="${camel(field.name)}Picker" formControlName="${field.name}" />
        <mat-datepicker-toggle matSuffix [for]="${camel(field.name)}Picker"></mat-datepicker-toggle>
        <mat-datepicker #${camel(field.name)}Picker></mat-datepicker>
      </mat-form-field>`;
      }
      if (field.type === 'money' || field.type === 'number') {
        return `      <mat-form-field appearance="legacy" fxFlex="50" fxFlex.lt-md="100">
        <mat-label>${field.label}</mat-label>
        <input matInput type="number" formControlName="${field.name}" />
        <span matPrefix *ngIf="${field.type === 'money'}">&pound;&nbsp;</span>
      </mat-form-field>`;
      }
      return `      <mat-form-field appearance="legacy" fxFlex="50" fxFlex.lt-md="100">
        <mat-label>${field.label}</mat-label>
        <input matInput formControlName="${field.name}" />
        <mat-error *ngIf="form.controls['${field.name}'].hasError('required')">${field.label} is required</mat-error>
      </mat-form-field>`;
    })
    .join('\n\n');

  return `<section class="${feature.name}-form" fxLayout="column" fxLayoutGap="16px">
  <h1 class="${feature.name}-form__title">{{ editing ? 'Edit' : 'New' }} ${feature.entity}</h1>

  <mat-card>
    <form [formGroup]="form" (ngSubmit)="submit()" fxLayout="column" fxLayoutGap="12px">
      <div fxLayout="row wrap" fxLayoutGap="16px grid" fxLayout.lt-md="column">
${inputs}
      </div>

      <mat-divider></mat-divider>

      <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="8px" fxLayoutAlign.lt-sm="stretch stretch">
        <button mat-stroked-button type="button" (click)="cancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </form>
  </mat-card>
</section>
`;
}

function formComponent(feature) {
  const Entity = pascal(feature.entity);
  const Service = pascal(feature.name) + 'Service';
  const Component = pascal(feature.name) + 'FormComponent';
  const controls = feature.fields
    .filter((field) => field.type !== 'status')
    .map((field) => {
      const initial = field.type === 'money' || field.type === 'number' ? '0' : "''";
      const validators = field.type === 'string' ? '[Validators.required]' : '[]';
      return '      ' + field.name + ': [' + initial + ', ' + validators + '],';
    })
    .join('\n');

  return `import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'ui-kit';

import { ${Entity} } from '../../${feature.name}.model';
import { ${Service} } from '../../${feature.name}.service';

@Component({
  selector: 'bk-${feature.name}-form',
  templateUrl: './${feature.name}-form.component.html',
  styleUrls: ['./${feature.name}-form.component.scss'],
})
export class ${Component} implements OnInit, OnDestroy {
  form: FormGroup;
  editing = false;
  saving = false;

  private id: string | null = null;
  private readonly destroyed\$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: ${Service},
    private readonly notifications: NotificationService
  ) {
    this.form = this.fb.group({
${controls}
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.editing = true;
      this.id = id;
      this.service
        .get(id)
        .pipe(takeUntil(this.destroyed\$))
        .subscribe((entity) => this.form.patchValue(entity as unknown as Record<string, unknown>));
    }
  }

  ngOnDestroy(): void {
    this.destroyed\$.next();
    this.destroyed\$.complete();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = { ...this.form.value, id: this.id || undefined } as Partial<${Entity}>;
    this.service
      .save(payload)
      .pipe(takeUntil(this.destroyed\$))
      .subscribe({
        next: (saved) => {
          this.saving = false;
          this.notifications.success('${title(feature.entity)} saved');
          this.router.navigate(['/${feature.name}', saved.id]);
        },
        error: () => {
          this.saving = false;
          this.notifications.error('We could not save that ${feature.entity}.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/${feature.name}']);
  }
}
`;
}

function summaryComponent(feature) {
  const Component = pascal(feature.name) + 'SummaryComponent';
  return {
    ts: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-${feature.name}-summary',
  templateUrl: './${feature.name}-summary.component.html',
  styleUrls: ['./${feature.name}-summary.component.scss'],
})
export class ${Component} {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
`,
    html: `<mat-card class="${feature.name}-summary" fxLayout="column" fxLayoutGap="8px">
  <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
    <mat-icon class="${feature.name}-summary__icon">${feature.icon}</mat-icon>
    <h3 class="${feature.name}-summary__title" fxFlex>${title(feature.name)}</h3>
  </div>

  <mat-divider></mat-divider>

  <div fxLayout="row" fxLayoutAlign="space-between baseline">
    <span class="${feature.name}-summary__headline">{{ headline }}</span>
    <mat-spinner *ngIf="loading" diameter="16"></mat-spinner>
  </div>

  <p class="${feature.name}-summary__blurb" fxHide.lt-md>${feature.summary}</p>
</mat-card>
`,
    scss: `.${feature.name}-summary {
  padding: calc(var(--bk-spacing-unit) * 2);

  &__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  &__icon {
    color: var(--bk-color-primary);
  }

  &__headline {
    font-size: 22px;
    font-weight: 600;
  }

  &__blurb {
    margin: 0;
    color: #667085;
    font-size: 13px;
  }
}
`,
  };
}

function routingModule(feature) {
  const Prefix = pascal(feature.name);
  const routes = [
    "  { path: '', component: " + Prefix + "ListComponent }",
  ];
  if (feature.form) {
    routes.push("  { path: 'new', component: " + Prefix + "FormComponent }");
    routes.push("  { path: ':id/edit', component: " + Prefix + "FormComponent }");
  }
  routes.push("  { path: ':id', component: " + Prefix + "DetailComponent }");

  const imports = [Prefix + 'ListComponent', Prefix + 'DetailComponent']
    .concat(feature.form ? [Prefix + 'FormComponent'] : [])
    .map(
      (name) =>
        "import { " +
        name +
        " } from './pages/" +
        feature.name +
        '-' +
        name.replace(Prefix, '').replace('Component', '').toLowerCase() +
        '/' +
        feature.name +
        '-' +
        name.replace(Prefix, '').replace('Component', '').toLowerCase() +
        ".component';"
    )
    .join('\n');

  return `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

${imports}

const routes: Routes = [
${routes.join(',\n')},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ${Prefix}RoutingModule {}
`;
}

function featureModule(feature) {
  const Prefix = pascal(feature.name);
  const pages = ['list', 'detail'].concat(feature.form ? ['form'] : []);
  const imports = pages
    .map(
      (page) =>
        "import { " +
        Prefix +
        pascal(page) +
        "Component } from './pages/" +
        feature.name +
        '-' +
        page +
        '/' +
        feature.name +
        '-' +
        page +
        ".component';"
    )
    .join('\n');

  const declarations = pages
    .map((page) => '    ' + Prefix + pascal(page) + 'Component,')
    .join('\n');

  return `import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { UiKitModule } from 'ui-kit';

${imports}
import { ${Prefix}SummaryComponent } from './components/${feature.name}-summary/${feature.name}-summary.component';
import { ${Prefix}RoutingModule } from './${feature.name}-routing.module';
import { ${Prefix}Service } from './${feature.name}.service';

@NgModule({
  declarations: [
${declarations}
    ${Prefix}SummaryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    UiKitModule,
    ${Prefix}RoutingModule,
  ],
  providers: [${Prefix}Service],
})
export class ${Prefix}Module {}
`;
}

function serviceSpec(feature) {
  const Service = pascal(feature.name) + 'Service';
  return `import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ${Service} } from './${feature.name}.service';

describe('${Service}', () => {
  let service: ${Service};
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [${Service}],
    });
    service = TestBed.inject(${Service});
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the first page by default', () => {
    service.list().subscribe();

    const request = http.expectOne((req) => req.url === '/api/${feature.name}');
    expect(request.request.params.get('page')).toBe('1');
    expect(request.request.params.get('pageSize')).toBe('25');
    request.flush({ items: [], total: 0, page: 1, pageSize: 25 });
  });

  it('caches the first page', () => {
    service.first().subscribe();
    service.first().subscribe();

    http.expectOne((req) => req.url === '/api/${feature.name}').flush({
      items: [],
      total: 0,
      page: 1,
      pageSize: 25,
    });
  });

  it('posts new records and puts existing ones', () => {
    service.save({}).subscribe();
    expect(http.expectOne('/api/${feature.name}').request.method).toBe('POST');
    http.verify();

    service.save({ id: 'x-1' } as never).subscribe();
    expect(http.expectOne('/api/${feature.name}/x-1').request.method).toBe('PUT');
  });
});
`;
}

function listSpec(feature) {
  const Prefix = pascal(feature.name);
  return `import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ${Prefix}ListComponent } from './${feature.name}-list.component';
import { ${Prefix}Service } from '../../${feature.name}.service';

describe('${Prefix}ListComponent', () => {
  let fixture: ComponentFixture<${Prefix}ListComponent>;
  let component: ${Prefix}ListComponent;
  let service: jasmine.SpyObj<${Prefix}Service>;

  beforeEach(async () => {
    service = jasmine.createSpyObj<${Prefix}Service>('${Prefix}Service', ['list', 'get', 'save', 'remove', 'first', 'count']);
    service.list.and.returnValue(of({ items: [], total: 0, page: 1, pageSize: 25 }));

    await TestBed.configureTestingModule({
      declarations: [${Prefix}ListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: ${Prefix}Service, useValue: service }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(${Prefix}ListComponent);
    component = fixture.componentInstance;
  });

  it('loads the first page on init', () => {
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalledWith(1, 25);
    expect(component.loading).toBeFalse();
  });

  it('surfaces a friendly error when loading fails', () => {
    service.list.and.returnValue(throwError(() => new Error('boom')));
    fixture.detectChanges();

    expect(component.error).toContain('could not load');
  });

  it('reloads from page one when the search changes', fakeAsync(() => {
    fixture.detectChanges();
    component.page = 3;
    component.search.setValue('groceries');
    tick(300);

    expect(component.page).toBe(1);
  }));

  it('applies paginator events', () => {
    fixture.detectChanges();
    component.onPage({ pageIndex: 2, pageSize: 50, length: 100 });

    expect(service.list).toHaveBeenCalledWith(3, 50);
  });
});
`;
}

function main() {
  let files = 0;
  for (const feature of FEATURES) {
    const dir = APP + '/features/' + feature.name;
    rmrf(dir);

    write(dir + '/' + feature.name + '.model.ts', modelFile(feature));
    write(dir + '/' + feature.name + '.service.ts', serviceFile(feature));
    write(dir + '/' + feature.name + '.service.spec.ts', serviceSpec(feature));
    write(dir + '/' + feature.name + '.module.ts', featureModule(feature));
    write(dir + '/' + feature.name + '-routing.module.ts', routingModule(feature));
    files += 5;

    const listDir = dir + '/pages/' + feature.name + '-list';
    write(listDir + '/' + feature.name + '-list.component.ts', listComponent(feature));
    write(listDir + '/' + feature.name + '-list.component.html', listTemplate(feature));
    write(listDir + '/' + feature.name + '-list.component.scss', listStyles(feature));
    write(listDir + '/' + feature.name + '-list.component.spec.ts', listSpec(feature));
    files += 4;

    const detailDir = dir + '/pages/' + feature.name + '-detail';
    write(detailDir + '/' + feature.name + '-detail.component.ts', detailComponent(feature));
    write(detailDir + '/' + feature.name + '-detail.component.html', detailTemplate(feature));
    write(detailDir + '/' + feature.name + '-detail.component.scss', detailStyles(feature));
    files += 3;

    if (feature.form) {
      const formDir = dir + '/pages/' + feature.name + '-form';
      write(formDir + '/' + feature.name + '-form.component.ts', formComponent(feature));
      write(formDir + '/' + feature.name + '-form.component.html', formTemplate(feature));
      write(formDir + '/' + feature.name + '-form.component.scss', detailStyles(feature));
      files += 3;
    }

    const summary = summaryComponent(feature);
    const summaryDir = dir + '/components/' + feature.name + '-summary';
    write(summaryDir + '/' + feature.name + '-summary.component.ts', summary.ts);
    write(summaryDir + '/' + feature.name + '-summary.component.html', summary.html);
    write(summaryDir + '/' + feature.name + '-summary.component.scss', summary.scss);
    files += 3;
  }

  console.log('features: ' + FEATURES.length + ' modules, ' + files + ' files');
}

main();
