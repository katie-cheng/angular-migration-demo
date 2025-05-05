'use strict';

/**
 * Flags dependencies that are archived, deprecated or otherwise a known
 * blocker for the framework upgrade. Advisory by default; set STRICT=1 to
 * fail the job.
 */
const pkg = require('../../package.json');

const KNOWN_BLOCKERS = {
  '@angular/flex-layout': 'Archived by the Angular team; no Angular 15+ release. Migrate to CSS grid/flexbox.',
  protractor: 'Deprecated end-to-end runner; replaced by the Playwright behaviour suite.',
  tslint: 'Deprecated; replaced by @angular-eslint.',
  'codelyzer': 'Deprecated with tslint.',
};

const all = { ...pkg.dependencies, ...pkg.devDependencies };
const found = Object.keys(all).filter((name) => KNOWN_BLOCKERS[name]);

if (!found.length) {
  console.log('No known upgrade blockers in the dependency list.');
  process.exit(0);
}

console.log('Known upgrade blockers still present:\n');
for (const name of found) {
  console.log('  ' + name + '@' + all[name] + '\n    ' + KNOWN_BLOCKERS[name]);
}

process.exit(process.env.STRICT === '1' ? 1 : 0);
