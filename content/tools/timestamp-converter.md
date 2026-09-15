---
type: "tools"
title: "Timestamp Converter"
description: "Convert between Unix timestamps and human-readable dates in both directions, and see the instant across 12 major world cities - Beijing, Tokyo, London, New York and more."
tagline: "Unix time ↔ dates, across 12 world cities."
widget: "timestamp-converter"
keywords: "unix timestamp, epoch time, timestamp converter, time converter, unix time, epoch converter, world clock, time zone"
---

The Timestamp Converter works both ways automatically and shows every result across **12 major world cities**:

- **Paste a timestamp** - drop a Unix timestamp (10 digits = seconds, 13 digits = milliseconds, auto-detected) and the world clock instantly shows that instant in Beijing, Tokyo, Singapore, Dubai, Moscow, Berlin, Paris, London, New York, Chicago, Los Angeles and Sydney.
- **Pick a date & time** - select any date & time (interpreted as your local time, Beijing UTC+8) and the Unix seconds/milliseconds appear instantly at the top.
- **Live** - conversions update as you type; with empty inputs the panel follows the current time, ticking every second.
- **Copy** - copies all city times plus the Unix values.

## Getting the Unix timestamp in code

| Language | Seconds | Milliseconds |
|---|---|---|
| JavaScript | `Math.round(Date.now() / 1000)` | `Date.now()` |
| Java | `System.currentTimeMillis() / 1000` | `System.currentTimeMillis()` |
| Python | `int(time.time())` | `int(time.time() * 1000)` |
| Go | `time.Now().Unix()` | `time.Now().UnixNano() / 1e6` |
| PHP | `time()` | `(int)(microtime(true) * 1000)` |
| Ruby | `Time.now.to_i` | `(Time.now.to_f * 1000).to_i` |
| C# | `DateTimeOffset.UtcNow.ToUnixTimeSeconds()` | `DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()` |
| Swift | `NSDate().timeIntervalSince1970` | `NSDate().timeIntervalSince1970 * 1000` |

All conversion happens locally in your browser.
