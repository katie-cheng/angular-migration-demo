'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');

function write(relPath, contents) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents.endsWith('\n') ? contents : contents + '\n', 'utf8');
  return full;
}

function rmrf(relPath) {
  fs.rmSync(path.join(ROOT, relPath), { recursive: true, force: true });
}

function pascal(kebab) {
  return kebab.split(/[-_]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

function camel(kebab) {
  const p = pascal(kebab);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

function title(kebab) {
  return kebab.split(/[-_]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

// Deterministic pseudo-random so regeneration produces an identical tree.
function rng(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) {
    s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return function next() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pick(random, arr) {
  return arr[Math.floor(random() * arr.length) % arr.length];
}

module.exports = { ROOT, write, rmrf, pascal, camel, title, rng, pick };
