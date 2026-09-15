---
type: "tools"
title: "Language Cipher"
description: "Encrypt text into Chinese hanzi, English letters, Greek, Cyrillic, Thai or Japanese kana with an optional secret key - all locally in your browser."
tagline: "Encrypt text into any script with an optional key."
widget: "language-cipher"
keywords: "language cipher, text encryption, secret key, cipher, crab language, chinese cipher, encrypt to hanzi, decrypt text"
---

The Language Cipher transforms text into another writing system, optionally protected by a secret key:

- **Choose an output script** - Chinese hanzi, English letters, Greek, Cyrillic, Thai or Japanese kana.
- **Encrypt** - every character is encoded into script characters (1 hanzi or 2 letters per byte).
- **Secret key (optional)** - set a key to scramble the encoding; the same key is then required to decrypt.
- **Decrypt** - paste the ciphertext, pick the same language and key, and the original text is restored.

The encoding is fully reversible: text &rarr; UTF-8 bytes &rarr; script characters. With a key, each byte is shifted by the key characters (mod 256) before encoding, and unshifted again on decryption. A wrong key or language produces an error or unreadable text, so keep both consistent.

All conversion happens locally in your browser - nothing is sent to a server.
