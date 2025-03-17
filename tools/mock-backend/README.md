# Mock backend

Stands in for the identity service, the ledger service, the legacy mainframe
gateway and the telemetry collector during local development and the
behaviour suite.

```bash
npm run mock-backend          # http://localhost:4300
MOCK_MFA=off npm run mock-backend   # skip the step-up challenge
```

All credentials are accepted except the password `wrong-password`, which
returns a 401. The MFA code is always `123456`.

Nothing here is real: every name, sort code and card number is invented.
