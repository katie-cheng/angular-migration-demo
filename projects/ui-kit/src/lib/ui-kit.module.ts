import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ButtonComponent } from './components/button/button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { SelectComponent } from './components/select/select.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SortHeaderComponent } from './components/sort-header/sort-header.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CardComponent } from './components/card/card.component';
import { PanelComponent } from './components/panel/panel.component';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { BadgeComponent } from './components/badge/badge.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { MenuComponent } from './components/menu/menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { CurrencyAmountComponent } from './components/currency-amount/currency-amount.component';
import { AccountTileComponent } from './components/account-tile/account-tile.component';
import { TransactionRowComponent } from './components/transaction-row/transaction-row.component';
import { StatusPillComponent } from './components/status-pill/status-pill.component';
import { NavRailComponent } from './components/nav-rail/nav-rail.component';
import { KeyValueListComponent } from './components/key-value-list/key-value-list.component';
import { SectionHeadingComponent } from './components/section-heading/section-heading.component';
import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MetricTileComponent } from './components/metric-tile/metric-tile.component';
import { SparklineComponent } from './components/sparkline/sparkline.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ElevationDirective } from './directives/elevation.directive';
import { TrimInputDirective } from './directives/trim-input.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TestIdDirective } from './directives/test-id.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { CopyToClipboardDirective } from './directives/copy-to-clipboard.directive';
import { MaskedAccountPipe } from './pipes/masked-account.pipe';
import { SortCodePipe } from './pipes/sort-code.pipe';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { SignedAmountPipe } from './pipes/signed-amount.pipe';
import { IbanPipe } from './pipes/iban.pipe';
import { TransactionStatusPipe } from './pipes/transaction-status.pipe';

/**
 * Overlay-rendered components (dialog, menu, select, snack bar) sit outside
 * the component tree, so the design system tags their panels with its own
 * classes through the supported default-options tokens and styles those.
 */
const OVERLAY_PANEL_PROVIDERS = [
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { panelClass: 'bk-dialog-panel', maxWidth: '80vw' } },
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
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {
      panelClass: ['bk-snack'],
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      politeness: 'assertive',
    },
  },
];

const MATERIAL = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
];

const DECLARATIONS = [
  ButtonComponent,
  IconButtonComponent,
  FormFieldComponent,
  TextInputComponent,
  NumberInputComponent,
  SelectComponent,
  MultiSelectComponent,
  AutocompleteComponent,
  CheckboxComponent,
  RadioGroupComponent,
  SlideToggleComponent,
  SliderComponent,
  DatepickerComponent,
  DateRangeComponent,
  TabsComponent,
  TableComponent,
  PaginatorComponent,
  SortHeaderComponent,
  ConfirmDialogComponent,
  CardComponent,
  PanelComponent,
  ChipListComponent,
  BadgeComponent,
  AvatarComponent,
  ProgressBarComponent,
  SpinnerComponent,
  StepperComponent,
  ExpansionPanelComponent,
  MenuComponent,
  ToolbarComponent,
  BreadcrumbsComponent,
  AlertBannerComponent,
  EmptyStateComponent,
  CurrencyAmountComponent,
  AccountTileComponent,
  TransactionRowComponent,
  StatusPillComponent,
  NavRailComponent,
  KeyValueListComponent,
  SectionHeadingComponent,
  AmountInputComponent,
  FileUploadComponent,
  SearchFieldComponent,
  TimelineComponent,
  MetricTileComponent,
  SparklineComponent,
  AutofocusDirective,
  ElevationDirective,
  TrimInputDirective,
  ClickOutsideDirective,
  TestIdDirective,
  DisableControlDirective,
  CopyToClipboardDirective,
  MaskedAccountPipe,
  SortCodePipe,
  RelativeTimePipe,
  TruncatePipe,
  YesNoPipe,
  SignedAmountPipe,
  IbanPipe,
  TransactionStatusPipe,
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL],
  exports: [...DECLARATIONS, ...MATERIAL],
  providers: [...OVERLAY_PANEL_PROVIDERS],
})
export class UiKitModule {}
