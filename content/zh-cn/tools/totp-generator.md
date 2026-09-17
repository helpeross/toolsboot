---
type: "tools"
title: "TOTP 验证码生成器"
description: "使用 Base32 密钥生成 RFC 6238 动态验证码，带实时倒计时，支持多种位数。"
tagline: "免费在线 TOTP（RFC 6238）验证码生成器，带倒计时。"
widget: "totp-generator"
keywords: "totp生成,totp验证器,2fa验证码,rfc 6238,otp生成,谷歌验证器"
---

TOTP 验证码生成器在浏览器中实现 RFC 6238：粘贴 Base32 密钥（与 Google Authenticator、Authy 等 2FA 服务相同的格式），当前 6-8 位验证码立即出现，每 30 秒刷新并带实时倒计时条。

随机密钥按钮可生成 20 字符全新 Base32 密钥用于测试。包括 HMAC-SHA1 计算在内全部在本地运行，密钥不会离开设备。