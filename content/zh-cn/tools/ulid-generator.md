---
type: "tools"
title: "ULID 生成器"
description: "生成带毫秒时间戳、可按时间排序的 ULID，内置解码器可提取嵌入的时间。"
tagline: "免费在线 ULID 生成器，支持时间戳解码。"
widget: "ulid-generator"
keywords: "ulid生成器,ulid,可排序id,字典序唯一id,ulid解码"
---

ULID 生成器产出字典序可排序的标识符：48 位毫秒时间戳前缀加 80 位随机数。与 UUID 不同，ULID 按创建时间排序，非常适合数据库索引与事件流。

内置解码器可从任意 ULID 读回时间戳并显示 UTC 精确创建时间。一次最多生成 1000 个。创建与解码全部在浏览器本地完成。