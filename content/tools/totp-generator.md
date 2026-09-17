---
type: "tools"
title: "TOTP Authenticator"
description: "Generate RFC 6238 TOTP one-time codes from a Base32 secret, with live countdown and multiple digit lengths."
tagline: "Free online TOTP (RFC 6238) authenticator with countdown."
widget: "totp-generator"
keywords: "totp generator, totp authenticator, 2fa code, rfc 6238, otp generator, google authenticator"
---

The TOTP Authenticator implements RFC 6238 in your browser: paste a Base32 secret (the same kind used by Google Authenticator, Authy and 2FA services) and the current 6-8 digit code appears immediately, refreshing every 30 seconds with a live countdown bar.

A random-secret button creates a fresh 20-character Base32 key for testing. Everything - including the HMAC-SHA1 computation - runs locally, so your secrets never leave the device.