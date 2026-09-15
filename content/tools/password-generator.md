---
type: "tools"
title: "Password Generator"
description: "Generate strong, customizable random passwords with digits, letters, symbols and custom characters, per-type minimums, unique-character and ambiguous-character options - all in your browser."
tagline: "Generate strong, customizable random passwords."
widget: "password-generator"
keywords: "password generator, random password, strong password, secure password, password creator, random password generator, unique password"
---

The Password Generator creates cryptographically random passwords with full control over their makeup:

- **Character types** - digits, lowercase, uppercase, symbols, and your own custom character set.
- **Minimums per type** - guarantee each enabled type appears at least N times (defaults to 1 each), so a "letters + digits" password always contains both.
- **Length and quantity** - 1-256 characters (slider to 64), 1-100 passwords at once.
- **Unique characters** - each character is used at most once per password.
- **Exclude ambiguous** - drops easily-confused characters like `0O`, `1lI` and `|`.

Settings are saved in your browser (localStorage) and restored on your next visit; **Reset** clears them back to the defaults. All randomness comes from the browser's cryptographic generator (`crypto.getRandomValues`) and passwords are generated locally - nothing is ever sent to a server.
