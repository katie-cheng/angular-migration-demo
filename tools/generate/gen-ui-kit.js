'use strict';

// Generates the @bank/ui-kit design-system library: bank-branded wrappers
// around Angular Material, plus the shared directives and pipes.
//
//   node tools/generate/gen-ui-kit.js

const { write, rmrf, pascal, title } = require('./lib/util');
const catalog = require('./lib/ui-kit-catalog');

const LIB = 'projects/ui-kit/src/lib';

const MAT_IMPORT = {
  MatButtonModule: '@angular/material/button',
  MatIconModule: '@angular/material/icon',
  MatFormFieldModule: '@angular/material/form-field',
  MatInputModule: '@angular/material/input',
  MatSelectModule: '@angular/material/select',
  MatAutocompleteModule: '@angular/material/autocomplete',
  MatCheckboxModule: '@angular/material/checkbox',
  MatRadioModule: '@angular/material/radio',
  MatSlideToggleModule: '@angular/material/slide-toggle',
  MatSliderModule: '@angular/material/slider',
  MatDatepickerModule: '@angular/material/datepicker',
  MatNativeDateModule: '@angular/material/core',
  MatTabsModule: '@angular/material/tabs',
  MatTableModule: '@angular/material/table',
  MatPaginatorModule: '@angular/material/paginator',
  MatSortModule: '@angular/material/sort',
  MatDialogModule: '@angular/material/dialog',
  MatSnackBarModule: '@angular/material/snack-bar',
  MatTooltipModule: '@angular/material/tooltip',
  MatMenuModule: '@angular/material/menu',
  MatChipsModule: '@angular/material/chips',
  MatProgressBarModule: '@angular/material/progress-bar',
  MatProgressSpinnerModule: '@angular/material/progress-spinner',
  MatStepperModule: '@angular/material/stepper',
  MatExpansionModule: '@angular/material/expansion',
  MatToolbarModule: '@angular/material/toolbar',
};

const DIRECTIVES = [
  {
    name: 'autofocus',
    selector: '[bkAutofocus]',
    body: `@Input() bkAutofocus = true;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this.bkAutofocus) {
      this.host.nativeElement.focus();
    }
  }`,
    imports: `import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';`,
    iface: ' implements AfterViewInit',
  },
  {
    name: 'elevation',
    selector: '[bkElevation]',
    body: `@Input() bkElevation = 1;

  @HostBinding('style.boxShadow')
  get shadow(): string {
    return '0 ' + this.bkElevation + 'px ' + this.bkElevation * 3 + 'px rgba(31, 41, 51, 0.14)';
  }`,
    imports: `import { Directive, HostBinding, Input } from '@angular/core';`,
    iface: '',
  },
  {
    name: 'trim-input',
    selector: '[bkTrimInput]',
    body: `@HostListener('blur', ['$event.target'])
  onBlur(target: HTMLInputElement): void {
    target.value = target.value.trim();
  }`,
    imports: `import { Directive, HostListener } from '@angular/core';`,
    iface: '',
  },
  {
    name: 'click-outside',
    selector: '[bkClickOutside]',
    body: `@Output() bkClickOutside = new EventEmitter<void>();

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    if (!this.host.nativeElement.contains(target)) {
      this.bkClickOutside.emit();
    }
  }`,
    imports: `import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';`,
    iface: '',
  },
  {
    name: 'test-id',
    selector: '[bkTestId]',
    body: `@Input() bkTestId = '';

  @HostBinding('attr.data-test-id')
  get testId(): string {
    return this.bkTestId;
  }`,
    imports: `import { Directive, HostBinding, Input } from '@angular/core';`,
    iface: '',
  },
  {
    name: 'disable-control',
    selector: '[bkDisableControl]',
    body: `@Input()
  set bkDisableControl(disabled: boolean) {
    const action = disabled ? 'disable' : 'enable';
    this.ngControl.control?.[action]();
  }

  constructor(private readonly ngControl: NgControl) {}`,
    imports: `import { Directive, Input } from '@angular/core';\nimport { NgControl } from '@angular/forms';`,
    iface: '',
  },
  {
    name: 'copy-to-clipboard',
    selector: '[bkCopyToClipboard]',
    body: `@Input() bkCopyToClipboard = '';
  @Output() copied = new EventEmitter<string>();

  @HostListener('click')
  onClick(): void {
    this.copied.emit(this.bkCopyToClipboard);
  }`,
    imports: `import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';`,
    iface: '',
  },
];

const PIPES = [
  { name: 'masked-account', pipeName: 'bkMaskedAccount', args: 'value: string', ret: 'string', body: `return value ? '\\u2022\\u2022\\u2022\\u2022 ' + value.slice(-4) : '';` },
  { name: 'sort-code', pipeName: 'bkSortCode', args: 'value: string', ret: 'string', body: `return (value || '').replace(/(\\d{2})(?=\\d)/g, '$1-');` },
  { name: 'relative-time', pipeName: 'bkRelativeTime', args: 'value: string | Date', ret: 'string', body: `const then = new Date(value).getTime();\n    const days = Math.floor((Date.now() - then) / 86400000);\n    if (days <= 0) {\n      return 'Today';\n    }\n    return days === 1 ? 'Yesterday' : days + ' days ago';` },
  { name: 'truncate', pipeName: 'bkTruncate', args: 'value: string, max = 40', ret: 'string', body: `return value && value.length > max ? value.slice(0, max - 1) + '\\u2026' : value;` },
  { name: 'yes-no', pipeName: 'bkYesNo', args: 'value: boolean', ret: 'string', body: `return value ? 'Yes' : 'No';` },
  { name: 'signed-amount', pipeName: 'bkSignedAmount', args: 'value: number', ret: 'string', body: `const sign = value > 0 ? '+' : '';\n    return sign + value.toFixed(2);` },
  { name: 'iban', pipeName: 'bkIban', args: 'value: string', ret: 'string', body: `return (value || '').replace(/(.{4})/g, '$1 ').trim();` },
  { name: 'transaction-status', pipeName: 'bkTransactionStatus', args: 'value: string', ret: 'string', body: `const map: Record<string, string> = { P: 'Pending', S: 'Settled', F: 'Failed', R: 'Returned' };\n    return map[value] || 'Unknown';` },
];

function componentClass(entry) {
  const cls = pascal(entry.name) + 'Component';
  const inputs = entry.inputs || [];
  const outputs = entry.outputs || [];
  const ng = ['Component', 'ChangeDetectionStrategy'];
  if (inputs.length) ng.push('Input');
  if (outputs.length) ng.push('Output', 'EventEmitter');

  const lines = [];
  lines.push(`import { ${[...new Set(ng)].join(', ')} } from '@angular/core';`);
  if (entry.forms) lines.push(`import { FormControl } from '@angular/forms';`);
  if (entry.dialog) {
    lines.push(`import { Inject } from '@angular/core';`);
    lines.push(`import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';`);
    lines.push('');
    lines.push(`export interface ConfirmDialogData {`);
    lines.push(`  title: string;`);
    lines.push(`  message: string;`);
    lines.push(`  confirmLabel: string;`);
    lines.push(`  cancelLabel: string;`);
    lines.push(`}`);
  }
  lines.push('');
  lines.push(`@Component({`);
  lines.push(`  selector: 'bk-${entry.name}',`);
  lines.push(`  templateUrl: './${entry.name}.component.html',`);
  lines.push(`  styleUrls: ['./${entry.name}.component.scss'],`);
  if (entry.name === 'confirm-dialog') {
    lines.push(`  changeDetection: ChangeDetectionStrategy.Default,`);
  } else {
    lines.push(`  changeDetection: ChangeDetectionStrategy.OnPush,`);
  }
  lines.push(`})`);
  lines.push(`export class ${cls} {`);
  for (const [name, type, def] of inputs) {
    lines.push(`  @Input() ${name}: ${type} = ${def};`);
  }
  for (const out of outputs) {
    const type = out === 'pressed' ? 'MouseEvent' : out === 'tabChanged' || out === 'pageChanged' ? 'number' : out === 'changed' ? 'boolean' : out === 'dismissed' || out === 'actioned' ? 'void' : 'string';
    lines.push(`  @Output() readonly ${out} = new EventEmitter<${type}>();`);
  }
  if (entry.forms) {
    lines.push(`  @Input() control: FormControl = new FormControl('');`);
  }
  if (entry.dialog) {
    lines.push('');
    lines.push(`  constructor(`);
    lines.push(`    readonly dialogRef: MatDialogRef<${cls}, boolean>,`);
    lines.push(`    @Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData,`);
    lines.push(`  ) {}`);
  }
  if (entry.body) {
    lines.push('');
    lines.push('  ' + entry.body);
  }
  lines.push(`}`);
  return lines.join('\n');
}

function componentSpec(entry) {
  const cls = pascal(entry.name) + 'Component';
  const mats = [...(entry.mat || []), ...(entry.mat2 || [])];
  const imports = [`import { ComponentFixture, TestBed } from '@angular/core/testing';`];
  imports.push(`import { NoopAnimationsModule } from '@angular/platform-browser/animations';`);
  if (entry.forms) imports.push(`import { ReactiveFormsModule } from '@angular/forms';`);
  for (const m of [...new Set(mats)]) imports.push(`import { ${m} } from '${MAT_IMPORT[m]}';`);
  imports.push(`import { ${cls} } from './${entry.name}.component';`);

  const testImports = ['NoopAnimationsModule', ...(entry.forms ? ['ReactiveFormsModule'] : []), ...new Set(mats)];

  const providers = entry.dialog
    ? `      providers: [
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Confirm', message: 'Are you sure?', confirmLabel: 'Yes', cancelLabel: 'No' } },
      ],\n`
    : '';
  if (entry.dialog) {
    imports.push(`import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';`);
  }

  const extra = [];
  for (const [name, type, def] of entry.inputs || []) {
    if (type === 'string' && def !== "''") continue;
  }

  // Wrappers that project arbitrary content are exercised through a host
  // component so the projection is part of the assertion.
  if (entry.specHost) {
    return `import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
${[...new Set(mats)].map((m) => `import { ${m} } from '${MAT_IMPORT[m]}';`).join('\n')}
import { ${cls} } from './${entry.name}.component';

@Component({
  template: \`${entry.specHost}\`,
})
class Host${cls} {}

describe('${cls}', () => {
  let fixture: ComponentFixture<Host${cls}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [${cls}, Host${cls}],
      imports: [NoopAnimationsModule, ReactiveFormsModule, ${[...new Set(mats)].join(', ')}],
    }).compileComponents();

    fixture = TestBed.createComponent(Host${cls});
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders its own label, hint and projected control', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.bk-form-field__label')?.textContent).toContain('Amount');
    expect(element.querySelector('.bk-form-field__hint')?.textContent).toContain('USD');
    expect(element.querySelector('.bk-form-field__control input')).toBeTruthy();
  });

  it('renders without throwing when change detection runs twice', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
`;
  }

  return `${imports.join('\n')}

describe('${cls}', () => {
  let fixture: ComponentFixture<${cls}>;
  let component: ${cls};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [${cls}],
      imports: [${testImports.join(', ')}],
${providers}    }).compileComponents();

    fixture = TestBed.createComponent(${cls});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders without throwing when change detection runs twice', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
${extra.join('\n')}});
`;
}

function directiveFiles(d) {
  const cls = pascal(d.name) + 'Directive';
  write(`${LIB}/directives/${d.name}.directive.ts`, `${d.imports}

@Directive({ selector: '${d.selector}' })
export class ${cls}${d.iface} {
  ${d.body}
}
`);
  write(`${LIB}/directives/${d.name}.directive.spec.ts`, `import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ${cls} } from './${d.name}.directive';

@Component({ template: '<div></div>' })
class Host${cls} {}

describe('${cls}', () => {
  let fixture: ComponentFixture<Host${cls}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [${cls}, Host${cls}],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(Host${cls});
    fixture.detectChanges();
  });

  it('compiles the host component with the directive declared', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
`);
  return cls;
}

function pipeFiles(p) {
  const cls = pascal(p.name) + 'Pipe';
  write(`${LIB}/pipes/${p.name}.pipe.ts`, `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: '${p.pipeName}' })
export class ${cls} implements PipeTransform {
  transform(${p.args}): ${p.ret} {
    ${p.body}
  }
}
`);
  write(`${LIB}/pipes/${p.name}.pipe.spec.ts`, `import { ${cls} } from './${p.name}.pipe';

describe('${cls}', () => {
  const pipe = new ${cls}();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform(${p.specArg || sampleArg(p)} as never)).toBeDefined();
  });
});
`);
  return cls;
}

function sampleArg(p) {
  if (p.args.startsWith('value: number')) return '12.5';
  if (p.args.startsWith('value: boolean')) return 'true';
  return `'12345678'`;
}

function main() {
  rmrf(`${LIB}/components`);
  rmrf(`${LIB}/directives`);
  rmrf(`${LIB}/pipes`);
  rmrf(`${LIB}/ui-kit.component.ts`);
  rmrf(`${LIB}/ui-kit.component.spec.ts`);
  rmrf(`${LIB}/ui-kit.service.ts`);
  rmrf(`${LIB}/ui-kit.service.spec.ts`);

  const componentClasses = [];
  const matModules = new Set();

  for (const entry of catalog) {
    const cls = pascal(entry.name) + 'Component';
    componentClasses.push({ cls, file: `components/${entry.name}/${entry.name}.component` });
    for (const m of [...(entry.mat || []), ...(entry.mat2 || [])]) matModules.add(m);

    write(`${LIB}/components/${entry.name}/${entry.name}.component.ts`, componentClass(entry));
    write(`${LIB}/components/${entry.name}/${entry.name}.component.html`, entry.tpl);
    write(`${LIB}/components/${entry.name}/${entry.name}.component.scss`, entry.scss || '');
    write(`${LIB}/components/${entry.name}/${entry.name}.component.spec.ts`, componentSpec(entry));
  }

  const directiveClasses = DIRECTIVES.map((d) => ({ cls: directiveFiles(d), file: `directives/${d.name}.directive` }));
  const pipeClasses = PIPES.map((p) => ({ cls: pipeFiles(p), file: `pipes/${p.name}.pipe` }));

  const declarations = [...componentClasses, ...directiveClasses, ...pipeClasses];
  const matList = [...matModules].sort();

  write(`${LIB}/ui-kit.module.ts`, `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
${matList.map((m) => `import { ${m} } from '${MAT_IMPORT[m]}';`).join('\n')}

${declarations.map((d) => `import { ${d.cls} } from './${d.file}';`).join('\n')}

/**
 * Overlay-rendered components (dialog, menu, select, snack bar) sit outside
 * the component tree, so the design system tags their panels with its own
 * classes through the supported default-options tokens and styles those.
 */
const OVERLAY_PANEL_PROVIDERS = [
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { panelClass: 'bk-dialog-panel' } },
  {
    provide: MAT_MENU_DEFAULT_OPTIONS,
    useValue: {
      xPosition: 'after',
      yPosition: 'below',
      overlapTrigger: false,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      overlayPanelClass: 'bk-menu-panel',
    },
  },
  { provide: MAT_SELECT_CONFIG, useValue: { overlayPanelClass: 'bk-select-panel' } },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { panelClass: ['bk-snack'], duration: 4000 } },
];

const MATERIAL = [
${matList.map((m) => `  ${m},`).join('\n')}
];

const DECLARATIONS = [
${declarations.map((d) => `  ${d.cls},`).join('\n')}
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL],
  exports: [...DECLARATIONS, ...MATERIAL],
  providers: [...OVERLAY_PANEL_PROVIDERS],
})
export class UiKitModule {}
`);

  write('projects/ui-kit/src/public-api.ts', `/*
 * Public API surface of @bank/ui-kit — the Northwind Retail design system.
 */

export * from './lib/ui-kit.module';
export * from './lib/dialog.service';
export * from './lib/notification.service';
export * from './lib/design-tokens';
${declarations.map((d) => `export * from './lib/${d.file}';`).join('\n')}
`);

  // eslint-disable-next-line no-console
  console.log('ui-kit: ' + componentClasses.length + ' components, ' + directiveClasses.length + ' directives, ' + pipeClasses.length + ' pipes');
}

main();
