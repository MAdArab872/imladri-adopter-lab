#!/usr/bin/env node

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const ignoredDirs = new Set(['.git', 'generated', 'logs', 'node_modules']);
const forbiddenPatterns = [
  /any-ci/i,
  /any ci/i,
  /23 adopter/i,
  /23 paths/i,
  /48\/71/i,
  /CircleCI/i,
  /Buildkite/i,
  /Bitbucket/i,
  /Azure/i,
  /scan:upload/i,
  /--upload/i,
  /hosted ci proof:/i,
  /IMLADRI_SDK_KEY/i,
  /rpa_[A-Za-z0-9]/,
  /sk-[A-Za-z0-9]/,
  /app-[A-Za-z0-9]{10,}/,
];

function* files(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        yield* files(join(dir, entry.name));
      }
    } else if (entry.isFile()) {
      yield join(dir, entry.name);
    }
  }
}

const hits = [];
for (const file of files(root)) {
  if (relative(root, file).replace(/\\/g, '/') === 'scripts/verify-public-lab.mjs') {
    continue;
  }
  const text = readFileSync(file, 'utf8');
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(text)) {
      hits.push(`${relative(root, file)} matched ${pattern}`);
    }
  }
}

if (hits.length) {
  console.error('Public lab verification failed:');
  for (const hit of hits) {
    console.error(`- ${hit}`);
  }
  process.exit(1);
}

console.log('Public lab verification passed.');
