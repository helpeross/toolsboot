---
type: "tools"
title: "AES 加密/解密"
description: "免费的在线 AES-256 加密工具，支持 GCM 与 CBC 模式，口令经 PBKDF2 派生密钥，全程本地运行。"
tagline: "免费在线 AES-256 加密，GCM/CBC、口令密钥、100% 本地。"
widget: "aes-encrypt"
keywords: "aes加密,aes解密,aes-256,aes gcm,aes cbc,在线加密,pbkdf2"
---

AES 加密/解密工具在浏览器中加密 AES-256 文本。选择 GCM（认证加密，推荐）或 CBC 模式，输入任意口令，密钥经 PBKDF2（10 万次迭代）派生。加密输出把盐、IV 与密文打包成一个以 v1 开头的字符串。

解密时粘贴密文并输入相同口令即可还原；口令错误会干净地失败。所有操作基于 Web Crypto API 在本地完成，明文与口令不会离开设备。