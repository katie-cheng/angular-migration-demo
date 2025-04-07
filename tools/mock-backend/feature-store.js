'use strict';

/**
 * Generic in-memory CRUD store backing the feature areas (bill pay, alerts,
 * disputes and friends). Each feature gets its own collection, seeded the
 * first time it is asked for.
 */
const express = require('express');
const { seededRandom } = require('./fixtures');

const SEED_COUNT = 37;
const collections = new Map();

function seed(feature) {
  const random = seededRandom(feature.length * 104729);
  const items = [];

  for (let i = 0; i < SEED_COUNT; i++) {
    items.push({
      id: feature + '-' + String(i + 1).padStart(3, '0'),
      reference: feature.toUpperCase().slice(0, 3) + '-' + (1000 + i),
      biller: 'Lumen Energy',
      accountRef: 'REF' + (700000 + i),
      recipient: 'Sam Okafor',
      handle: '@sam.okafor',
      nickname: 'Everyday Current',
      maskedNumber: '••••4417',
      network: i % 2 === 0 ? 'Visa' : 'Mastercard',
      product: 'Personal loan',
      property: '14 Alder Grove',
      symbol: ['NWB', 'ARDT', 'GLEN', 'VUSA'][i % 4],
      units: Math.round(random() * 400),
      marketValue: Math.round(random() * 500000) / 100,
      gainLoss: Math.round((random() - 0.4) * 100000) / 100,
      outstanding: Math.round(random() * 2000000) / 100,
      rate: Math.round(random() * 900) / 100,
      period: '2024-' + String((i % 12) + 1).padStart(2, '0'),
      format: 'PDF',
      trigger: 'Balance below',
      channel: i % 2 === 0 ? 'Push' : 'Email',
      threshold: Math.round(random() * 50000) / 100,
      label: 'Marketing preferences',
      value: i % 2 === 0 ? 'On' : 'Off',
      stage: ['Identity', 'Affordability', 'Decision'][i % 3],
      transactionRef: 'TXN-' + (55000 + i),
      reason: 'Goods not received',
      offer: '5% back at Greenhill Grocers',
      merchant: 'Greenhill Grocers',
      subject: 'Question about a payment',
      amount: Math.round(random() * 40000) / 100,
      value_: null,
      status: ['active', 'pending', 'complete', 'failed'][i % 4],
      dueOn: new Date(Date.UTC(2024, i % 12, (i % 27) + 1)).toISOString(),
      expiry: new Date(Date.UTC(2027, i % 12, 1)).toISOString(),
      nextPaymentOn: new Date(Date.UTC(2024, (i + 1) % 12, 5)).toISOString(),
      termEndsOn: new Date(Date.UTC(2041, i % 12, 1)).toISOString(),
      issuedOn: new Date(Date.UTC(2024, i % 12, 2)).toISOString(),
      startedOn: new Date(Date.UTC(2023, i % 12, 9)).toISOString(),
      raisedOn: new Date(Date.UTC(2024, i % 12, 12)).toISOString(),
      expiresOn: new Date(Date.UTC(2024, (i + 3) % 12, 20)).toISOString(),
      updatedOn: new Date(Date.UTC(2024, i % 12, 3)).toISOString(),
      lastMessageOn: new Date(Date.UTC(2024, i % 12, 15)).toISOString(),
      scheduledFor: i % 5 === 0 ? new Date(Date.UTC(2024, i % 12, 25)).toISOString() : null,
    });
  }

  return items;
}

function collectionFor(feature) {
  if (!collections.has(feature)) {
    collections.set(feature, seed(feature));
  }
  return collections.get(feature);
}

function featureRouter() {
  const router = express.Router({ mergeParams: true });

  router.get('/', (req, res) => {
    const items = collectionFor(req.params.feature);
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 25);

    res.json({
      items: items.slice((page - 1) * pageSize, page * pageSize),
      total: items.length,
      page,
      pageSize,
    });
  });

  router.get('/:id', (req, res) => {
    const item = collectionFor(req.params.feature).find(
      (candidate) => candidate.id === req.params.id
    );
    if (!item) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.json(item);
  });

  router.post('/', (req, res) => {
    const items = collectionFor(req.params.feature);
    const created = { ...req.body, id: req.params.feature + '-' + (items.length + 1) };
    items.unshift(created);
    res.status(201).json(created);
  });

  router.put('/:id', (req, res) => {
    const items = collectionFor(req.params.feature);
    const index = items.findIndex((candidate) => candidate.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    items[index] = { ...items[index], ...req.body, id: req.params.id };
    res.json(items[index]);
  });

  router.delete('/:id', (req, res) => {
    const items = collectionFor(req.params.feature);
    const index = items.findIndex((candidate) => candidate.id === req.params.id);
    if (index !== -1) {
      items.splice(index, 1);
    }
    res.status(204).end();
  });

  return router;
}

module.exports = { featureRouter, collectionFor };
