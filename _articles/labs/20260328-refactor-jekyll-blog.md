---
title: 重构 Jekyll 博客
aliases: ['重构 Jekyll 博客']
created: 2026-03-28 13:57:04
modified: 2026-03-28 18:13:12
comments: True
draft: False
tags: ['blog', 'jekyll', 'rss', 'writing/lab']
description: 因为种种原因，我需要统一： https//note.bgzo.cc https//blog.bgzo.cc https//bgzo.cc 这几个网站的定位，考虑到自己的 blog.bgzo.cc 已经存在很长一段时间了，并且已被 V2EX 收录，最终考虑依然将自己的大部分文章放在这里，note.bgzo.cc 专注零碎的思考，bgzo.cc 只是个人探索的项目。 Jekyll 兼容自定义类型的 M...
---


因为种种原因，我需要统一：

- https://note.bgzo.cc
- https://blog.bgzo.cc
- https://bgzo.cc

这几个网站的定位，考虑到自己的 `blog.bgzo.cc` 已经存在很长一段时间了，并且已被 V2EX 收录，最终考虑依然将自己的大部分文章放在这里，`note.bgzo.cc` 专注零碎的思考，`bgzo.cc` 只是个人探索的项目。

## Jekyll 兼容自定义类型的 Markdown 文件

一般情况下，jekyll 天然支持的 markdown 内容格式为：

```yaml
layout: post
title: XXX
updated: 2026-03-28
```

并且要求文件名类似 `YEAR-MONTH-DAY-title.MARKUP` 格式，例如 `2026-03-27-my-post.md`。但我日常用 Obsidian 书写不用这些书写，文件名都是随机起的，priority 也不一样，我用的是：

```yaml
title: xxx
aliases:
  - xxx
created: 2026-03-28T13:57:04
modified: 2026-03-28T16:52:30
comments: true
draft: true
tags:
  - writing/lab
```

默认情况下，我的这些文章不会进入变量 `site.posts`，因此为了使 Jekyll 强行兼容后者，因此有两种改动：

1. 下游同步脚本增加额外处理，批量重命名文件为 Jekyll 标准命名；
2. 保持现有文件名，不再用官方的 `_posts`，重新写一套配置，重新写首页的模板；

> [!TIP]
> 关于为什么第二方案必须重新定义一套规则，因为 `site.posts` 在 Jekyll 里面是**硬编码**，不可配置的。比如不按人家的命名规则走， `site.posts` 永远为空。

| `site.posts`      | 自定义 collection        |                                      |
| ----------------- | --------------------- | ------------------------------------ |
| 来源目录              | 只能是 `_posts`          | `_<name>/` 任意命名                      |
| 文件名要求             | 必须 `YYYY-MM-DD-title` | 无限制                                  |
| 内置 `date` 解析      | 自动从文件名提取              | 需自己在 front matter 写 `date`/`created` |
| `output: true` 默认 | 是                     | 显式配置                                 |

所以，自定义一套 `_articles` 集合，增加配置：

```yml
collections: # 定义 Jekyll 集合，用于将同类内容分组管理
  posts: # 名为 "posts" 的集合（对应 _posts/ 目录下的文件）
    output: false # 不为该集合的文档生成独立页面，仅作为数据源使用
  articles: # 名为 "articles" 的集合，用于实际对外发布的文章
    output: true # 为该集合的每篇文档生成独立的 HTML 输出页面
    permalink: /:title.html # 输出页面的 URL 格式：以文章标题命名，扩展名为 .html
```

截止目前，首页函数已经可以解析，但是进去没有声明 layout，会导致无 CSS，需要再增加如下配置，隐式补全：

```yml
defaults: # 批量为文档注入默认 front matter，避免每篇文章重复声明
  - scope: # 定义该组默认值的作用范围
      path: "" # 路径为空字符串，表示匹配网站内所有路径
      type: articles # 仅对 "articles" 集合中的文档生效
    values: # 以下为要注入的默认 front matter 字段
      layout: post # 默认使用 "post" 布局模板（对应 _layouts/post.html）
```

到这完成首页、文章的改造。

因为选择了方案 2，抛弃了 `site.posts`， 所以社区的 RSS 插件 `jekyll-feed` 会失效，所以生成 RSS 地址需要自己手写：

```markdown
---
layout: none
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <generator uri="https://jekyllrb.com/" version="{{ jekyll.version }}">Jekyll</generator>
  <link href="{{ site.url }}/feed.xml" rel="self" type="application/atom+xml"/>
  <link href="{{ site.url }}/" rel="alternate" type="text/html"/>
  <updated>{{ site.time | date_to_xmlschema }}</updated>
  <id>{{ site.url }}/feed.xml</id>
  <title type="html">{{ site.title | xml_escape }}</title>
  <subtitle>{{ site.description | xml_escape }}</subtitle>
  {% if site.author %}
  <author>
    <name>{{ site.author | xml_escape }}</name>
  </author>
  {% endif %}
  {% assign articles = site.articles | sort: "created" | reverse %}
  {% for post in articles limit: 20 %}
  <entry>
    <title type="html">{{ post.title | xml_escape }}</title>
    <link href="{{ post.url | prepend: site.url }}"/>
    <published>{{ post.created | date_to_xmlschema }}</published>
    <updated>{{ post.modified | default: post.created | date_to_xmlschema }}</updated>
    <id>{{ post.url | prepend: site.url }}</id>
    <content type="html" xml:base="{{ post.url | prepend: site.url }}">{{ post.content | xml_escape }}</content>
    {% if post.description %}
    <summary type="html">{{ post.description | xml_escape }}</summary>
    {% endif %}
  </entry>
  {% endfor %}
</feed>
```

之后，RSS Feed 也可以正常输出了。

## Feed 不兼容

上面加完之后依然有一个问题，我发现收录我博客的下面两个网址没有更新内容（已经超过 12h）

- https://www.qireader.com/subscriptions/p4YmaAWDNp2q6bKl#https://blog.bgzo.cc/feed.xml
- https://www.v2ex.com/xna/s/104

首先，排查了下 RSS 地址，用 https://validator.w3.org/feed/check.cgi 验证了一下 [^value-error]，没有问题。

[^value-error]: https://zhangzifan.com/validator-rss-feed.html

然后，翻找了一下 Vercel 过去的快照，找到了之前提供的源：

- 旧的: https://blog-czlfazsnq-bgzos-projects.vercel.app/feed.xml
- 新的: https://blog-f5fmpamy9-bgzos-projects.vercel.app/feed.xml

分析一下，有几点差异：

1. **[最大可能]** `<link>` 缺少 `rel` 和 `type` 属性

```diff
- <link href="..." rel="alternate" type="text/html" title="..."/>
+ <link href="..."/>
```

> [!NOTE]
> Atom 规范要求每个 `<entry>` 至少有一个 `rel="alternate"` 的 link。很多 feed 聚合器依赖这个属性来识别文章链接，没有它就无法找到条目的 URL，导致不更新或不显示。

2. 内容用 `xml_escape` 而非 CDATA

```diff
- <content ...><![CDATA[<p>...</p>]]></content>
+ <content ...>&lt;p&gt;...&lt;/p&gt;</content>
```

作出如下调整：

```diff
- <link href="{{ post.url | prepend: site.url }}"/>
+ <link href="{{ post.url | prepend: site.url }}" rel="alternate" type="text/html" title="{{ post.title | xml_escape }}"/>

- <content type="html" xml:base="{{ post.url | prepend: site.url }}">{{ post.content | xml_escape }}</content>
+ <content type="html" xml:base="{{ post.url | prepend: site.url }}"><![CDATA[{{ post.content }}]]></content>
```

前后的格式保持一致了，这下再观察一下