---
type: "tools"
title: "AES Encrypt / Decrypt"
description: "A free online AES-256 encryption tool with GCM and CBC modes, passphrase-based keys via PBKDF2, fully client-side."
tagline: "Free online AES-256 encryption with GCM/CBC, passphrase keys, 100% local."
widget: "aes-encrypt"
keywords: "aes encrypt, aes decrypt, aes-256, aes gcm, aes cbc, online encryption, pbkdf2"
---

The AES Encrypt / Decrypt tool encrypts text with AES-256 in your browser. Choose GCM (authenticated, recommended) or CBC mode, enter any passphrase, and a key is derived with PBKDF2 (100,000 iterations). Encrypted output bundles salt, IV and ciphertext into a single portable string prefixed with v1.

Decryption reverses the process - paste the ciphertext and enter the same passphrase. Without the correct passphrase, decryption fails cleanly. Because everything runs locally with the Web Crypto API, your plaintext and passphrase never leave the device.