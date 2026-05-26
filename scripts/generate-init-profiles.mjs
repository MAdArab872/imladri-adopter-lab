#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const adopters = JSON.parse(readFileSync(resolve(root, 'adopters.json'), 'utf8'));
const outputDir = resolve(root, 'generated');
mkdirSync(outputDir, { recursive: true });

const commands = adopters.map((adopter) => ({
  slug: adopter.slug,
  init: `imladri init --framework ${adopter.framework} --ci-provider ${adopter.ciProvider}`,
  ci: `imladri scan init-ci --provider ${adopter.ciProvider} --output ${adopter.ciProvider === 'vercel' ? 'scripts/imladri-vercel-scan.sh' : `.github/workflows/imladri-scan-${adopter.slug}.yml`}`,
  localProof: 'imladri scan --path . --config .imladri-scan.json --format json --output logs/imladri-boundary.json --fail-on new',
}));

writeFileSync(resolve(outputDir, 'adopter-init-commands.json'), `${JSON.stringify(commands, null, 2)}\n`, 'utf8');
writeFileSync(
  resolve(outputDir, 'adopter-init-commands.md'),
  [
    '# Imladri Adopter Init Commands',
    '',
    ...commands.flatMap((entry) => [
      `## ${entry.slug}`,
      '',
      '```bash',
      entry.init,
      entry.ci,
      entry.localProof,
      '```',
      '',
    ]),
  ].join('\n'),
  'utf8',
);

console.log(`Generated ${commands.length} adopter init profiles in generated/.`);
