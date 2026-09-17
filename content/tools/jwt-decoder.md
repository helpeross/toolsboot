---
type: "tools"
title: "JWT Decoder / Encoder"
description: "A free online JWT decoder that parses JWT headers and payloads and verifies HS256, HS384 and HS512 signatures with your secret, directly in your browser."
tagline: "Free online JWT decoder with signature verification."
widget: "jwt-decoder"
keywords: "jwt decoder, jwt encoder, jwt verify, token decoder, hs256, json web token"
---

The JWT Decoder parses any JSON Web Token instantly: paste a token on the left and the header and payload are decoded and pretty-printed on the right. No setup, no server - the token never leaves your browser.

To verify a signature, enter the secret key in the field below the input. The page checks HS256, HS384 and HS512 signatures locally using the Web Crypto API and reports whether the signature is valid. Tokens without a secret are still decoded normally. All processing is local, so tokens containing sensitive claims can be inspected safely.
