---
type: "tools"
title: "RSA Encrypt / Decrypt"
description: "A free online RSA encryption tool that generates 2048-bit RSA key pairs and encrypts or decrypts messages with OAEP padding, entirely in your browser."
tagline: "Free online RSA-OAEP encryption and decryption with key generation."
widget: "rsa-encrypt"
keywords: "rsa encrypt, rsa decrypt, rsa key generator, rsa oaep, public key, private key, pem"
---

The RSA Encrypt / Decrypt tool generates a fresh 2048-bit RSA-OAEP key pair with one click, or accepts your own public and private keys in PEM format. Paste a public key to encrypt plaintext; paste the matching private key to decrypt Base64 ciphertext.

Encryption and decryption use OAEP padding with SHA-256 via the Web Crypto API. Key generation, import and all operations happen locally - keys and messages never leave your browser. Note that RSA-OAEP-2048 can encrypt at most 190 bytes per operation, which suits short messages such as keys and credentials.
