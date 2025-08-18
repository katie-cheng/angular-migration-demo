# Known debt

What we know is wrong, roughly in the order it will hurt during the Angular
upgrade. Kept honest rather than tidy.

## Blocking the upgrade

### `@angular/flex-layout` is archived

The package was archived by the Angular team and never shipped a stable
release for Angular 15 or later. It is a hard stop: we cannot take the
Angular 15 bump while it is in the dependency tree.

It is used in roughly eight hundred places across the retail templates, the
shell, the dashboard and both consumer applications, including the
responsive suffixes (`fxFlex.lt-md`, `fxHide.xs`). `MediaObserver` is also
used imperatively in the shell and the dashboard to switch the sidenav mode
and the dashboard column count.

Replacing it means CSS grid and flexbox plus media queries, and the CDK's
`BreakpointObserver` where the decision has to happen in TypeScript.

### Pre-MDC Angular Material

`ui-kit` is themed against Material 14's pre-MDC API — `@import
'~@angular/material/theming'`, `mat-palette`, `mat-light-theme` — and a
large number of component styles reach into Material's internal class
names: `.mat-button-wrapper`, `.mat-form-field-underline`,
`.mat-form-field-flex`, `.mat-select-arrow`, `.mat-tab-label`,
`.mat-checkbox-frame`, `.mat-slide-toggle-bar`, `.mat-dialog-container`,
`.mat-snack-bar-container`, `.mat-table`, `.mat-toolbar.mat-primary`,
`.mat-drawer-container`, `.mat-list-item-content`.

Material 15 replaced the component DOM. Every one of those selectors either
disappears or means something different, and the new components are taller,
so density has to be set explicitly to keep our current spacing.

### Deprecated `toPromise()`

`AuthService` uses `Observable.toPromise()` in `establishSession`,
`resumeSession`, `completeMfa`, `loadProfile` and `logout`. It is deprecated
in RxJS 7 and gone in RxJS 8, so an Angular major that pulls a current RxJS
will break the bootstrap path — and `resumeSession` runs inside an
`APP_INITIALIZER`, so a mistake there is a white screen, not a broken page.

Note that `toPromise()` on an empty source resolves with `undefined`; the
replacement has to keep that behaviour where callers depend on it, which is
why this is not a find-and-replace.

## Painful but not blocking

- **Theme duplication.** Design tokens exist twice, in SCSS and in
  TypeScript, and are synchronised by hand.
- **Consumer coupling.** The two consumer applications build against packed
  tarballs, so any change to a library's public API has to be validated
  through `tools/ci/pack-libs.js`, not just in the workspace.
- **Legacy field mapping.** The mainframe adapter's field translation is
  hand-written and only partly covered by tests. Currency conversion between
  minor and major units happens in two places.
- **No dedicated error boundary.** Feature list pages each set their own
  `error` string; there is no shared failure surface.
- **Accessibility.** `tools/ci/axe-scan.js` is advisory because the baseline
  has violations we have not worked through.
- **Coverage.** Well short of where it should be, and the feature-area specs
  are thin: they check the service wiring, not the templates.

## Deliberately left alone

- Telemetry batches are dropped rather than retried on failure.
- The correlation cookie is readable by JavaScript, because the SPA mints it.
- The mock backend accepts any password. It is a fixture, not a service.
