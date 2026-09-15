---
type: "tools"
title: "HTML Entity Encoder"
description: "Escape or unescape HTML entities to safely embed text in markup. Encode & < > \" ' and non-ASCII characters, or decode named and numeric entities."
tagline: "Escape & unescape HTML entities."
widget: "html-entity-encoder"
keywords: "html entities, html escape, html encode, html decode, entity encoder, escape html, unescape html, xss escape"
---

Encode or decode HTML entities entirely in your browser:

- **Encode** - escapes `& < > " '` to `&amp; &lt; &gt; &quot; &#39;` so text can be safely embedded in HTML. Tick **Non-ASCII** to also convert every non-ASCII character (Chinese, emoji, accented letters) to numeric entities like `&#x4E2D;`.
- **Decode** - resolves named entities (`&nbsp;`, `&copy;`, `&euro;`...) and numeric entities (`&#169;`, `&#xA9;`, emoji) back to characters. Decoding uses a `DOMParser`, so scripts are never executed.
- **Live** - conversion updates as you type; switch mode or toggle Non-ASCII any time.
- **Copy / Clear** - copy the output or reset both panes.

Everything runs locally - your data never leaves your device.
