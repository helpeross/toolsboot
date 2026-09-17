---
type: "tools"
title: "Base32 Encoder / Decoder"
description: "A free online Base32 encoder and decoder (RFC 4648) that converts text to and from Base32 in real time, entirely in your browser."
tagline: "Free online Base32 encoder and decoder with instant real-time conversion."
widget: "base32-encoder"
keywords: "base32 encoder, base32 decoder, base32 online, rfc4648, base32 tool"
---

The Base32 Encoder / Decoder converts text to and from Base32 (RFC 4648) in real time using the standard A-Z2-7 alphabet. It handles UTF-8 correctly, so emoji and non-Latin scripts round-trip cleanly. Output is padded with = to 8-character blocks, and the decoder accepts text with or without whitespace and padding.

Base32 is widely used where case-insensitive or human-friendly encodings matter: TOTP secrets, DNSSEC keys, PGP fingerprints and some hash displays. Encode mode turns any text into its Base32 form; decode mode reverses the process. Everything runs locally with plain JavaScript - nothing is uploaded, so it is safe with sensitive payloads.