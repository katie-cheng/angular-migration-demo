'use strict';

/**
 * Rebuilds the vendored `@northwind/legacy-charts` tarball.
 *
 * The real package was published by a team that no longer exists, compiled
 * with View Engine against Angular 8. We keep the tarball in `vendor/`
 * because it is the only copy left; this script exists so the artefact is
 * reproducible rather than mysterious.
 *
 *   node tools/vendor/build-legacy-charts.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const VERSION = '2.3.1';
const STAGE = fs.mkdtempSync(path.join(os.tmpdir(), 'legacy-charts-'));

function write(relative, contents) {
  const full = path.join(STAGE, relative);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
}

write(
  'package.json',
  JSON.stringify(
    {
      name: '@northwind/legacy-charts',
      version: VERSION,
      description: 'Sparkline and donut charts for Northwind internal apps (View Engine build).',
      license: 'UNLICENSED',
      main: 'bundles/northwind-legacy-charts.umd.js',
      module: 'fesm2015/northwind-legacy-charts.js',
      es2015: 'fesm2015/northwind-legacy-charts.js',
      typings: 'northwind-legacy-charts.d.ts',
      metadata: 'northwind-legacy-charts.metadata.json',
      sideEffects: false,
      peerDependencies: { '@angular/core': '>=8.0.0', '@angular/common': '>=8.0.0' },
    },
    null,
    2
  )
);

write(
  'northwind-legacy-charts.d.ts',
  `export declare class SparklineComponent {
    values: number[];
    stroke: string;
    get points(): string;
}
export declare class LegacyChartsModule {
}
`
);

write(
  'fesm2015/northwind-legacy-charts.js',
  `import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class SparklineComponent {
    constructor() {
        this.values = [];
        this.stroke = '#003366';
    }
    get points() {
        const values = this.values.length ? this.values : [0];
        const max = Math.max(...values, 1);
        const step = 100 / Math.max(values.length - 1, 1);
        return values.map((value, index) => (index * step) + ',' + (30 - (value / max) * 30)).join(' ');
    }
}
SparklineComponent.decorators = [
    { type: Component, args: [{
                selector: 'nw-sparkline',
                template: '<svg viewBox="0 0 100 30" preserveAspectRatio="none" style="width:100%;height:30px"><polyline fill="none" [attr.stroke]="stroke" stroke-width="2" [attr.points]="points"></polyline></svg>'
            }] }
];
SparklineComponent.propDecorators = {
    values: [{ type: Input }],
    stroke: [{ type: Input }]
};

class LegacyChartsModule {
}
LegacyChartsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SparklineComponent],
                imports: [CommonModule],
                exports: [SparklineComponent]
            }] }
];

export { LegacyChartsModule, SparklineComponent };
`
);

write(
  'bundles/northwind-legacy-charts.umd.js',
  `(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@northwind/legacy-charts', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.northwind = global.northwind || {}, global.northwind['legacy-charts'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';
    var SparklineComponent = /** @class */ (function () {
        function SparklineComponent() {
            this.values = [];
            this.stroke = '#003366';
        }
        return SparklineComponent;
    }());
    var LegacyChartsModule = /** @class */ (function () {
        function LegacyChartsModule() {
        }
        return LegacyChartsModule;
    }());
    exports.SparklineComponent = SparklineComponent;
    exports.LegacyChartsModule = LegacyChartsModule;
    Object.defineProperty(exports, '__esModule', { value: true });
})));
`
);

write(
  'northwind-legacy-charts.metadata.json',
  JSON.stringify({
    __symbolic: 'module',
    version: 4,
    metadata: {
      SparklineComponent: { __symbolic: 'class' },
      LegacyChartsModule: { __symbolic: 'class' },
    },
    origins: { SparklineComponent: './fesm2015', LegacyChartsModule: './fesm2015' },
    importAs: '@northwind/legacy-charts',
  })
);

write(
  'README.md',
  `# @northwind/legacy-charts

Sparkline and donut charts, built for the internal apps in 2019. Compiled
with View Engine; the publishing team was disbanded and the source was never
migrated to Ivy.
`
);

execSync('npm pack --pack-destination ' + JSON.stringify(path.join(ROOT, 'vendor')), {
  cwd: STAGE,
  stdio: 'inherit',
});

console.log('\nRebuilt vendor/northwind-legacy-charts-' + VERSION + '.tgz');
