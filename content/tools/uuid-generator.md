---
type: "tools"
title: "UUID Generator"
description: "Generate random and time-based UUIDs in six versions (v1, v3, v4, v5, v6, v7) with case, hyphen, wrap, and layout options, plus a validator that detects a UUID's version - all in your browser."
tagline: "Generate UUIDs in v1, v3, v4, v5, v6 and v7."
widget: "uuid-generator"
keywords: "uuid generator, uuid v4, uuid v7, generate uuid, random uuid, guid generator, bulk uuid, uuid validator, uuid version"
---

The UUID Generator creates UUIDs in **six versions**, one per line, right in your browser:

- **v4 - Random** - cryptographically random, the most common choice.
- **v1 - Time-based** - 60-bit timestamp with a random clock sequence and random node (your MAC address is never exposed).
- **v6 - Time-ordered** - v1's timestamp rearranged so IDs sort lexicographically by creation time.
- **v7 - Timestamp** - the newest standard: a 48-bit Unix-millisecond timestamp plus random bits, naturally time-ordered.
- **v3 - MD5 namespace** - deterministic: the same namespace + name always produces the same UUID.
- **v5 - SHA-1 namespace** - same mechanism as v3, using the stronger SHA-1 hash.

Output formatting covers the common cases: lowercase or uppercase, with or without hyphens, plain / `{braces}` / `urn:uuid:` wrapping, and one-per-line, comma-separated, or JSON-array layout. Results can be copied or downloaded as TXT or CSV.

The **UUID Validator** at the bottom checks any pasted UUID string and identifies its version and variant, including `{...}` and `urn:uuid:` forms.

All randomness comes from the browser's cryptographic generator (`crypto.randomUUID`, `crypto.getRandomValues`). Nothing is sent anywhere - UUIDs are generated and validated locally and never leave your device.
