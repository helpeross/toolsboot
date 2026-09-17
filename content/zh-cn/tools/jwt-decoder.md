---
type: "tools"
title: "JWT 编解码"
description: "免费的在线 JWT 解码工具，解析 JWT 头部与载荷，并可使用你的密钥本地校验 HS256、HS384 与 HS512 签名。"
tagline: "免费的在线 JWT 解码与签名校验工具。"
widget: "jwt-decoder"
keywords: "jwt解码,jwt解析,jwt校验,hs256,token解析,json web token"
---

JWT 编解码器可即时解析任意 JSON Web Token：在左侧粘贴令牌，右侧立即显示格式化后的 Header 与 Payload，无需任何配置、无需服务器，令牌不会离开你的浏览器。

如需校验签名，在输入框下方填入密钥即可。页面使用 Web Crypto API 在本地校验 HS256、HS384 与 HS512 签名，并提示签名是否有效；未提供密钥时仍可正常解码。所有处理均在本地完成，含敏感载荷的令牌也可以放心检查。
