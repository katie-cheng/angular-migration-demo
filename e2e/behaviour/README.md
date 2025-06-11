# Behaviour baseline

These specs are the gate every migration PR has to pass. They describe
product behaviour that must not change while the framework moves from
Angular 14 to 18: authentication and step-up, token refresh and replay,
cross-tab sign-out, the correlation cookie, analytics consent and flushing,
the provider adapters, the theme, and the responsive layout contract.

```bash
npm run e2e:behaviour                 # all three viewports
npx playwright test --project=mobile  # one viewport
```

The config starts the mock backend and `ng serve` for you. The suite is
deliberately small: it is a contract, not a functional test suite.
