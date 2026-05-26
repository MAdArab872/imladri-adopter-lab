#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const outputDir = resolve('generated', 'mcp');
mkdirSync(outputDir, { recursive: true });

const server = {
  command: 'node',
  args: ['mcp-server/server.mjs'],
  env: {
    IMLADRI_AGENT_ID: '<profile-agent-id>',
    IMLADRI_AUTHORITY_TOKEN: '<profile-issued-short-lived-authority-token>',
    IMLADRI_WORKER_URL: 'https://<worker>',
  },
};

const configs = {
  'claude_desktop_config.json': { mcpServers: { imladri: server } },
  'cursor-mcp.json': { mcpServers: { imladri: server } },
  'windsurf-mcp.json': { mcpServers: { imladri: server } },
};

for (const [file, value] of Object.entries(configs)) {
  writeFileSync(resolve(outputDir, file), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

console.log(`Generated MCP config artifacts in ${outputDir}.`);
