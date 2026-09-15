---
type: "tools"
title: "URL Encoder / Decoder"
description: "A free online URL encoder and decoder that percent-encodes text, query strings, and whole URLs with Component, URI, and form-encoding schemes, directly in your browser."
tagline: "Percent-encode or decode URLs and query strings."
widget: "url-encoder"
keywords: "url encoder, url decoder, percent encoding, url encode online, url decode online, encodeuricomponent, encodeuri, form url encoding, query string encoder"
---

The URL Encoder / Decoder converts text to and from percent-encoded (URL-safe) form in real time. Paste a plain string, a URL, or a query string on the left and the encoded (or decoded) result appears instantly on the right - no buttons to click unless you want them.

Three schemes cover the common cases:

- **Component** - uses `encodeURIComponent`-style rules, encoding everything including `&`, `?`, `=`, `/`, and `#`. Use it for individual query parameter values and path segments.
- **URI** - uses `encodeURI`-style rules and preserves reserved characters such as `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`, so whole URLs stay readable while spaces and unsafe characters are still encoded.
- **Form** - like Component, but encodes spaces as `+` for `application/x-www-form-urlencoded` payloads, which is what HTML forms and many APIs expect.

The Swap button reverses the direction, turning output back into input for quick re-decoding. Every operation runs locally with plain JavaScript. Nothing is sent anywhere, so it is safe to use with private URLs, tokens, and signed query strings.
