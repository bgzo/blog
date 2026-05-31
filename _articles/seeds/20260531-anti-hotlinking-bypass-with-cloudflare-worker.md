---
title: 防盗链的一种绕过方案
aliases: 防盗链的一种绕过方案
created: 2026-05-31 23:44:01
modified: 2026-05-31 23:49:48
tags: ['cloudflare/worker', 'proxy', 'public', 'web', 'writing/seed']
comments: True
draft: False
published: 2026-05-31 23:57:55
description: 我曾以为无解的防盗链问题，其实可以通过 Cloudflare Worker 绕过，今天实践了一下，确实可以绕过跨域和源站校验的问题： 当然，有法律风险和道德争议，仅供学习参考。
---

我曾以为无解的防盗链问题，其实可以通过 Cloudflare Worker 绕过，今天实践了一下，确实可以绕过跨域和源站校验的问题：

```js
// 配置目标网站
const TARGET_URL = 'https://www.example.com';  // ⚠️ 替换为你要代理的网站地址

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // 构建目标 URL，保留原始请求路径
    const targetUrl = TARGET_URL + url.pathname + url.search;

    // 创建一个新 Headers 对象，复制原始请求头
    const newHeaders = new Headers(request.headers);

    // --- 在这里添加伪装的关键代码 ---
    // 1. 修改或添加 Origin 和 Referer
    newHeaders.set('Origin', TARGET_URL);
    newHeaders.set('Referer', TARGET_URL);

    // 2. 伪装一个常见的 User-Agent
    newHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 3. 删除可能暴露真实访问来源的 Headers
    newHeaders.delete('Referer');      // 确保我们上面新设的生效
    newHeaders.delete('Origin');       // 确保我们上面新设的生效
    newHeaders.delete('CF-Connecting-IP');
    newHeaders.delete('CF-IPCountry');
    newHeaders.delete('CF-Ray');
    newHeaders.delete('CF-Visitor');
    newHeaders.delete('CDN-Loop');
    newHeaders.delete('X-Forwarded-For');

    // 构建新的请求
    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'follow',
    });

    // 发起真正的请求
    const response = await fetch(proxyRequest);

    // 处理响应，添加跨域头以支持在不同源上使用
    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    // 移除可能导致问题的安全策略头
    modifiedResponse.headers.delete('Content-Security-Policy');
    modifiedResponse.headers.delete('X-Frame-Options');

    return modifiedResponse;
  }
}
```

当然，有法律风险和道德争议，仅供学习参考。