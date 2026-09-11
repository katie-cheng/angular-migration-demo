# Architecture

## The shape of the estate

Three applications share four libraries inside one Angular CLI workspace.
The retail application is the product; the business portal and the adviser
desktop are downstream consumers that install the libraries as packed
tarballs in their own pipelines, which is why the consumer matrix job in CI
builds them against `npm pack` output rather than the workspace paths.

```
retail-banking ─┐
small-business ─┼─> ui-kit ──> @angular/material
wealth-advisor ─┘   auth ────> HttpClient, BroadcastChannel
                    analytics-sdk
                    data-providers ──> ledger | legacy mainframe
```

## ui-kit

Forty-five components, seven directives and eight pipes wrapping Angular
Material with Northwind's tokens. The theme is a pre-MDC Material 14 theme:
`@import '~@angular/material/theming'` plus positional palette helpers, and
a long tail of global overrides that reach into Material's internal class
names. Those overrides are the reason the Material v15 rewrite is not a
drop-in change.

Tokens live in TypeScript (`design-tokens.ts`) and in CSS custom properties
(`_theme.scss`). The two are kept in sync by hand.

## auth

`AuthService` owns login, refresh, MFA and logout. `SessionStore` keeps the
current session in a `BehaviorSubject`, mirrors it into `localStorage`, and
broadcasts changes to other tabs over a `BroadcastChannel` — which is how
signing out in one tab signs you out everywhere.

An `APP_INITIALIZER` resumes a stored session before the router runs, so a
reload does not bounce a signed-in customer to the login page. The HTTP
interceptor attaches the bearer token, a correlation id and the customer
segment, and on a 401 refreshes once and replays the queued requests.

Three guards protect routes: authenticated, entitled, and MFA-satisfied.

## analytics-sdk

Events are queued in memory and flushed on batch size, on a timer, and when
the tab is hidden. Nothing leaves the browser without explicit analytics
consent. Each event carries the session's correlation id. A failed batch is
dropped rather than retried, deliberately: telemetry must never retry into a
struggling collector.

## data-providers

`BankingProvider` is the abstraction; two implementations sit behind it.
The ledger provider talks to the current service in domain terms. The
legacy provider talks to the mainframe gateway and translates: upper-case
fixed-width fields, amounts in minor units, `YYYYMMDD` dates and single
character status codes. Which one you get depends on the customer's region.

`BankingFacade` caches accounts and payees with `shareReplay` and drops the
cache after an accepted transfer.

## retail-banking

Fifteen lazily loaded feature areas behind entitlement guards, plus a
dashboard and the core pages (login, step-up, not-entitled, not-found). The
shell decides between a docked and an overlay sidenav using the CDK
`BreakpointObserver`.

Layout is expressed with the `bk-*` utility classes from
`projects/ui-kit/src/styles/_layout.scss`, which carry the flex-layout
breakpoint aliases (`xs`, `lt-sm`, `lt-md`, `lt-lg`) as CSS media queries.

## Backend

`tools/mock-backend` serves identity, the ledger, the mainframe gateway and
the telemetry collector. `proxy.conf.json` points the dev server at it. The
behaviour suite starts both automatically.
