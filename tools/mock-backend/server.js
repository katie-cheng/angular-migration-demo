'use strict';

/**
 * Mock backend for local development and the behaviour suite.
 *
 * It stands in for the identity service, the ledger service, the legacy
 * mainframe gateway and the telemetry collector. Nothing here talks to a
 * real system and all credentials are accepted.
 */
const express = require('express');
const { accounts, transactions, payees, profile } = require('./fixtures');
const { legacyRouter } = require('./legacy-gateway');

const PORT = process.env.MOCK_BACKEND_PORT ? Number(process.env.MOCK_BACKEND_PORT) : 4300;
const ACCESS_TOKEN_TTL_MS = 5 * 60 * 1000;

const state = {
  mfaRequired: process.env.MOCK_MFA !== 'off',
  transfers: [],
  telemetry: [],
  refreshCount: 0,
  pushApprovals: new Map(),
};

function issueTokens(suffix) {
  return {
    accessToken: 'mock-access-' + suffix,
    refreshToken: 'mock-refresh-' + suffix,
    expiresAt: Date.now() + ACCESS_TOKEN_TTL_MS,
  };
}

function createApp() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization,x-correlation-id,x-customer-segment');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  // ---- identity -----------------------------------------------------------

  app.post('/api/identity/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
      res.status(400).json({ message: 'username and password are required' });
      return;
    }
    if (password === 'wrong-password') {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    res.json({
      tokens: issueTokens('1'),
      profile,
      mfaRequired: state.mfaRequired,
      mfaChannels: [
        { id: 'chan-sms', type: 'sms', hint: 'Text to ••••4417' },
        { id: 'chan-email', type: 'email', hint: 'Email to d••@example.test' },
      ],
    });
  });

  app.post('/api/identity/refresh', (req, res) => {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      res.status(401).json({ message: 'refresh token required' });
      return;
    }
    state.refreshCount += 1;
    res.json({ tokens: issueTokens('r' + state.refreshCount) });
  });

  app.post('/api/identity/mfa/start', (req, res) => {
    const transactionId = 'mfa-' + Date.now();
    state.pushApprovals.set(transactionId, 'pending');
    res.json({
      transactionId,
      channels: [{ id: req.body.channelId, type: 'sms', hint: 'Text to ••••4417' }],
      expiresAt: Date.now() + 5 * 60 * 1000,
    });
  });

  app.post('/api/identity/mfa/resend', (req, res) => {
    res.json({
      transactionId: req.body.transactionId,
      channels: [],
      expiresAt: Date.now() + 5 * 60 * 1000,
    });
  });

  app.get('/api/identity/mfa/push/:id', (req, res) => {
    res.json({ status: state.pushApprovals.get(req.params.id) || 'expired' });
  });

  app.post('/api/identity/mfa/verify', (req, res) => {
    if ((req.body || {}).code !== '123456') {
      res.status(401).json({ message: 'Invalid code' });
      return;
    }
    res.json({ tokens: issueTokens('mfa') });
  });

  app.get('/api/identity/profile', (_req, res) => res.json(profile));
  app.post('/api/identity/logout', (_req, res) => res.status(204).end());

  // ---- ledger -------------------------------------------------------------

  app.get('/api/ledger/accounts', (_req, res) => res.json(accounts));

  app.get('/api/ledger/accounts/:id', (req, res) => {
    const account = accounts.find((candidate) => candidate.id === req.params.id);
    if (!account) {
      res.status(404).json({ message: 'No such account' });
      return;
    }
    res.json(account);
  });

  app.get('/api/ledger/accounts/:id/transactions', (req, res) => {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 25);
    const all = transactions[req.params.id] || [];
    const search = String(req.query.search || '').toLowerCase();
    const filtered = search
      ? all.filter((txn) => txn.description.toLowerCase().includes(search))
      : all;

    res.json({
      items: filtered.slice((page - 1) * pageSize, page * pageSize),
      page,
      pageSize,
      total: filtered.length,
    });
  });

  app.get('/api/ledger/payees', (_req, res) => res.json(payees));

  app.post('/api/ledger/transfers', (req, res) => {
    const request = req.body || {};
    if (!request.amount || request.amount <= 0) {
      res.status(400).json({ message: 'amount must be positive' });
      return;
    }
    if (request.amount > 10000) {
      res.json({ id: 'xfer-rejected', status: 'rejected', clearedAt: null, reason: 'LIMIT_EXCEEDED' });
      return;
    }

    const receipt = {
      id: 'xfer-' + (state.transfers.length + 1),
      status: request.scheduledFor ? 'scheduled' : 'accepted',
      clearedAt: request.scheduledFor ? null : new Date().toISOString(),
      reason: null,
    };
    state.transfers.push({ request, receipt });
    res.json(receipt);
  });

  // ---- legacy mainframe gateway ------------------------------------------

  app.use('/api/core-legacy', legacyRouter());

  // ---- telemetry ----------------------------------------------------------

  app.post('/api/telemetry/events', (req, res) => {
    const batch = req.body || {};
    state.telemetry.push(batch);
    res.status(202).json({ accepted: (batch.events || []).length });
  });

  app.get('/api/telemetry/_captured', (_req, res) => res.json(state.telemetry));

  // ---- generic feature CRUD ----------------------------------------------

  app.use('/api/:feature', require('./feature-store').featureRouter());

  return app;
}

if (require.main === module) {
  createApp().listen(PORT, () => {
    console.log('mock backend listening on http://localhost:' + PORT);
  });
}

module.exports = { createApp, state };
