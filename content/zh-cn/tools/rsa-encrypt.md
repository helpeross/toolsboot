---
type: "tools"
title: "RSA 加密 / 解密"
description: "免费的在线 RSA 加密工具，一键生成 2048 位 RSA 密钥对，并使用 OAEP 填充在浏览器本地完成加解密。"
tagline: "免费的在线 RSA-OAEP 加密解密与密钥生成工具。"
widget: "rsa-encrypt"
keywords: "rsa加密,rsa解密,rsa密钥生成,rsa oaep,公钥,私钥,pem"
---

RSA 加密/解密工具可一键生成全新的 2048 位 RSA-OAEP 密钥对，也支持粘贴你自己的 PEM 格式公钥与私钥。填入公钥即可加密明文，填入匹配的私钥即可解密 Base64 密文。

加解密使用 SHA-256 的 OAEP 填充，基于 Web Crypto API 实现。密钥生成、导入与所有操作均在本地完成——密钥与消息不会离开浏览器。注意：RSA-OAEP-2048 单次最多加密 190 字节，适合密钥、凭据等短消息。
