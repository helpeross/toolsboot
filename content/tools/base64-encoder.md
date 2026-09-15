---
type: "tools"
title: "Base64 Encoder / Decoder"
description: "A free online Base64 encoder and decoder that converts text to and from Base64 with UTF-8 and URL-safe support, directly in your browser."
tagline: "Free online Base64 encoder and decoder with UTF-8 and URL-safe support."
widget: "base64-encoder"
keywords: "base64 encoder, base64 decoder, base64 online, url safe base64, base64 utf-8"
---

The Base64 Encoder / Decoder converts text to and from Base64 in real time. Paste a string on the left and the encoded (or decoded) result appears instantly on the right - no buttons to click unless you want them. It handles UTF-8 correctly, so emoji, CJK characters, and non-Latin scripts round-trip without corruption.

A URL-safe mode swaps `+` for `-` and `/` for `_`, stripping the trailing `=` padding, which is what JWT tokens, data URIs, and many APIs expect. A file upload lets you encode binary content - images, PDFs, fonts - directly to a Base64 data URI or raw string. The Swap button reverses the direction, turning output back into input for quick re-encoding.

Every operation runs locally with plain JavaScript. Nothing is uploaded, so it is safe to use with auth tokens, API keys, and other sensitive payloads.