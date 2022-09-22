# Northwind Retail — web workspace

Customer-facing web estate for Northwind Retail Bank: the retail banking
application, the small business portal, the adviser desktop, and the shared
libraries all three are built on.

> **This is a synthetic codebase.** Every customer, account, sort code and
> merchant in it is invented, every integration is mocked, and no part of it
> comes from a real bank. It exists to exercise a large Angular upgrade.

## Layout

```
projects/
  ui-kit/            design system on top of Angular Material
  auth/              session, MFA, interceptor, guards
  analytics-sdk/     consent-gated event collection
  data-providers/    ledger and legacy mainframe adapters
  retail-banking/    the customer app (15 lazy-loaded feature areas)
  small-business-portal/  downstream consumer of the libraries
  wealth-advisor/         downstream consumer of the libraries
tools/
  mock-backend/      identity, ledger, mainframe gateway, telemetry
  generate/          scaffolding scripts for the feature areas
  ci/                dependency, accessibility and packaging checks
e2e/behaviour/       the behaviour contract the upgrade must preserve
```

## Getting started

Node 16.20.x and npm 8.x. Anything newer will not build this Angular version.

```bash
nvm use                     # 16.20.2
npm ci --legacy-peer-deps
npm run build:libs          # the apps import the libraries from dist/
npm run mock-backend        # in one terminal
npm start                   # in another: http://localhost:4200
```

Sign in with any username and password (`wrong-password` is rejected on
purpose). The step-up code is always `123456`; start the backend with
`MOCK_MFA=off` to skip it.

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm run build:all` | Builds the libraries and all three applications |
| `npm test` | Unit tests for the retail app |
| `npm run test:libs` | Unit tests for the four libraries |
| `npm run test:coverage` | Unit tests with a coverage report |
| `npm run lint` | ESLint across every project |
| `npm run e2e:behaviour` | The Playwright behaviour contract |
| `node tools/ci/pack-libs.js` | Packs the libraries the way consumers install them |
| `npm run generate:features` | Regenerates the feature-area scaffolding |

## Current state

The workspace is on Angular 14.2 and is not yet upgradable in place: see
[docs/KNOWN-DEBT.md](docs/KNOWN-DEBT.md) for the blockers, and
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit together.
