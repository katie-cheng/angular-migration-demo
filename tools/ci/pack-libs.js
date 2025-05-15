'use strict';

/**
 * Builds the shared libraries and packs them as tarballs, then points the
 * consumer applications at the tarballs instead of the workspace paths.
 *
 * This is how the downstream teams actually consume the design system, so
 * the upgrade has to keep the packed artefact installable.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const LIBS = ['ui-kit', 'auth', 'analytics-sdk', 'data-providers'];
const OUT = path.join(ROOT, 'dist', 'packages');

function run(command) {
  console.log('$ ' + command);
  execSync(command, { cwd: ROOT, stdio: 'inherit' });
}

fs.mkdirSync(OUT, { recursive: true });

for (const lib of LIBS) {
  run('npx ng build ' + lib);
  run('npm pack ./dist/' + lib + ' --pack-destination ' + JSON.stringify(OUT));
}

const packed = fs.readdirSync(OUT).filter((file) => file.endsWith('.tgz'));
console.log('\nPacked artefacts:');
for (const file of packed) {
  console.log('  dist/packages/' + file);
}
