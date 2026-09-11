# Known debt

What we know is wrong, roughly in the order it will hurt. Kept honest rather
than tidy. The workspace is on Angular 18.2 / Angular Material 18.2 after the
14 -> 18 upgrade stack.

## Cleared by the Angular 14 -> 18 upgrade stack

- ~~**`@angular/flex-layout`.**~~ Archived package removed in step 1; layouts
  are CSS grid/flex and `BreakpointObserver`.
- ~~**Pre-MDC Angular Material.**~~ `ui-kit` is themed with the public Sass
  theming API and the MDC-era DOM; no `MatLegacy*` imports and no
  `~@angular/material/theming` import remain. Internal class-name selectors
  (`.mat-button-wrapper`, `.mat-form-field-underline`, `.mat-tab-label`, ...)
  were replaced with published selectors, component inputs and density.
- ~~**esbuild/application builder.**~~ All three applications build with
  `@angular-devkit/build-angular:application`; output is `dist/<app>/browser`.
- ~~**`--legacy-peer-deps`.**~~ The flag existed for `@angular/flex-layout`.
  A clean `npm ci` now resolves peers strictly, and the flag is gone from the
  README and both workflow files.

## Painful but not blocking

### Material 3 theming

`projects/ui-kit/src/styles/_theme.scss` stays on the Material 2 theming
system (`mat.m2-define-palette`, `mat.m2-define-light-theme`, renamed by the
official v18 migration). M2 is fully supported in v18, but it is the older
system and M3 is where Material's tokens are going. Moving to
`mat.define-theme` changes component colour, shape and density defaults, so it
is a design change with its own review — not something to fold into a version
bump.

### Standalone components

Every component in the four libraries and three applications is still declared
in an `NgModule`; nothing is `standalone: true`. The v18 standalone migration
(`ng generate @angular/core:standalone`) can be run per project, but it touches
every declaration and every consumer, so it wants its own PR per project rather
than one sweep.

### Built-in control flow

Templates still use `*ngIf` / `*ngFor` / `ngSwitch` (~168 occurrences).
`ng generate @angular/core:control-flow` converts them mechanically, but the
diff is large and the behaviour-suite screenshots have to be re-checked, so it
is deferred.

### Deprecated `toPromise()`

`AuthService` still uses `Observable.toPromise()` in `establishSession`,
`resumeSession`, `completeMfa`, `loadProfile` and `logout`. It is deprecated in
RxJS 7 and gone in RxJS 8. `toPromise()` on an empty source resolves with
`undefined`; the replacement (`firstValueFrom` / `lastValueFrom`) throws
instead, and `resumeSession` runs inside an `APP_INITIALIZER`, so a mistake
there is a white screen. Not a find-and-replace.

### The rest

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
  are thin: they check the service wiring, not the templates. The retail app
  carries two deliberately failing dashboard specs (`FIXME(NWR-2231)`,
  `FIXME(NWR-2402)`) and `ui-kit` seven lint errors, all known and intentional.
- **Zone.js.** The app depends on zone.js semantics in the auth interceptor's
  refresh/replay path and the analytics flush. Zoneless change detection is
  experimental in v18 and was not adopted; adopting it means reworking both.

## Deliberately left alone

- Telemetry batches are dropped rather than retried on failure.
- The correlation cookie is readable by JavaScript, because the SPA mints it.
- The mock backend accepts any password. It is a fixture, not a service.
