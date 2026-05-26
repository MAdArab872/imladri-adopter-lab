# Imladri Adopter Lab

Public, sanitized examples for trying the Imladri adoption surface without
publishing Profile credentials, hosted SaaS credentials, private proof packets,
or customer data.

This repo demonstrates framework setup command templates, local scanner command
templates, and MCP client configuration templates. Approved design-partner Profile uploads and
buyer proof packets stay in private Imladri workspaces.

## What It Covers

- 20 certified SDK adapter families.
- Local adopter init commands for common agent frameworks and hosted workflow
  shapes.
- Waitlist-safe scanner command templates that write local artifacts under
  `logs/` when run in an approved CLI workspace.
- MCP client config templates with placeholder authority values only.
- Hosted workflow names for Dify, Flowise, n8n, Zapier, and Botpress, without
  live service credentials.

## What It Does Not Claim

- This is not a public Profile workspace.
- This repo does not include live SaaS credentials, Profile SDK keys, or buyer
  proof packets.
- GitLab/Vercel hosted CI proof is certified separately inside Imladri. Other CI
  vendors are intentionally not presented here as certified hosted proof.

## Quick Start

```bash
npm run init:all
npm run mcp:configs
npm run verify
```

Generated command and MCP config previews are written to `generated/`, which is
ignored by git.

## Approved Design-Partner Proof

After approval, move the same local artifacts into a private Imladri workspace
for SDK certification upload, MCP authority issuance, hosted CI proof, and buyer
packet generation. Do not put Profile keys, webhook URLs, or hosted probe tokens
in this public repository.

## Evidence Rule

Public demos produce local evidence. Approved design partners can upload signed
evidence into Profile.
