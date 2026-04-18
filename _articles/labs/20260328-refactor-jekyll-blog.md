---
title: 重构 Jekyll 博客
aliases: ['重构 Jekyll 博客']
created: 2026-03-28 13:57:04
modified: 2026-04-18 20:05:19
published: 2026-03-28 13:57:04
tags: ['blog', 'callout', 'jekyll', 'public', 'rss', 'writing/lab']
comments: True
draft: False
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
tags:
  - writing/lab
```

默认情况下，我的这些文章不会进入变量 `site.posts`，因此为了使 Jekyll 强行兼容后者，因此有两种改动：

1. 下游同步脚本增加额外处理，批量重命名文件为 Jekyll 标准命名；
2. 保持现有文件名，不再用官方的 `_posts`，重新写一套配置，重新写首页的模板；

> [!TIP]
> 关于为什么第二方案必须重新定义一套规则，因为 `site.posts` 在 Jekyll 里面是**硬编码**，不可配置的。比如不按人家的命名规则走， `site.posts` 永远为空。

| 比较                | `site.posts`            | 自定义 collection                         |     |
| ------------------- | ----------------------- | ----------------------------------------- | --- |
| 来源目录            | 只能是 `_posts`         | `_<name>/` 任意命名                       |     |
| 文件名要求          | 必须 `YYYY-MM-DD-title` | 无限制                                    |     |
| 内置 `date` 解析    | 自动从文件名提取        | 需自己在 front matter 写 `date`/`created` |     |
| `output: true` 默认 | 是                      | 显式配置                                  |     |

考虑了一下，果断选择方案 2。

因此，我们需要自定义一套 `_articles` 集合，增加配置：

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

## 重新输出 RSS

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

如果你的网站里面存在 Jekyll 的模板内容，最终输出可能会乱掉，所以需要在配置里面新增一行配置：

```diff
defaults: # 批量为文档注入默认 front matter，避免每篇文章重复声明
  - scope: # 定义该组默认值的作用范围
      path: "" # 路径为空字符串，表示匹配网站内所有路径
      type: articles # 仅对 "articles" 集合中的文档生效
    values: # 以下为要注入的默认 front matter 字段
      layout: post # 默认使用 "post" 布局模板（对应 _layouts/post.html）
+     render_with_liquid: false # 禁止对文章内容进行 Liquid 渲染，避免代码块中的模板语法被执行
```

当然，还有一种办法是修改文章，在代码块上下加入：

```ruby
{% raw %}
{% endraw %}
```

> [!NOTE]
> 做的过程有个小插曲，如果第一次构建可以跳过下面部分

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

## Jekyll 支持 Obsidian 的语法糖：Youtube、Twitter 嵌入

```markdown
![](https://x.com/Enter_Apps/status/1768669206826926292)
![](https://twitter.com/Enter_Apps/status/1768669206826926292)
![](https://www.youtube.com/watch?v=p485kUNpPvE)
```

增加以下逻辑：

```html
<!-- Replace Obsidian-style ![]( URL ) with proper embeds for Twitter/X and YouTube -->
<script>
  (function () {
    var YT_RE =
      /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var YT_SHORT_RE = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;
    var TW_RE = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;

    function replaceImg(img, embed) {
      var parent = img.parentNode;
      // kramdown wraps standalone ![]() in <p>; unwrap it so block elements are valid
      if (parent && parent.tagName === "P" && parent.childNodes.length === 1) {
        parent.parentNode.replaceChild(embed, parent);
      } else {
        parent.replaceChild(embed, img);
      }
    }

    function makeYouTubeEmbed(videoId) {
      var wrapper = document.createElement("div");
      wrapper.className = "embed-youtube";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + videoId;
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.setAttribute("loading", "lazy");
      wrapper.appendChild(iframe);
      return wrapper;
    }

    function makeTwitterEmbed(tweetUrl) {
      var blockquote = document.createElement("blockquote");
      blockquote.className = "twitter-tweet";
      var a = document.createElement("a");
      a.href = tweetUrl;
      a.textContent = tweetUrl;
      blockquote.appendChild(a);
      return blockquote;
    }

    var imgs = Array.from(document.querySelectorAll("article img"));
    var hasTweet = false;

    imgs.forEach(function (img) {
      var src = img.getAttribute("src") || "";

      var ytMatch = src.match(YT_RE) || src.match(YT_SHORT_RE);
      if (ytMatch) {
        replaceImg(img, makeYouTubeEmbed(ytMatch[1]));
        return;
      }

      var twMatch = src.match(TW_RE);
      if (twMatch) {
        // Twitter's widgets.js only accepts twitter.com URLs, so normalise x.com → twitter.com
        var tweetUrl = src.replace(/^(https?:\/\/)x\.com\//, "$1twitter.com/");
        replaceImg(img, makeTwitterEmbed(tweetUrl));
        hasTweet = true;
        return;
      }
    });
    if (hasTweet) {
      var s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.charset = "utf-8";
      document.head.appendChild(s);
    }
  })();
</script>
```

做的时候发现，只有 x.com 的链接无法嵌入，这才发现注入的脚本还是老域名 twitter.com，没有换成新域名，这可太好笑了。

增加如下逻辑，从 x.com ，重新换回 twitter.com

```js
var twMatch = src.match(TW_RE);
if (twMatch) {
	// Twitter's widgets.js only accepts twitter.com URLs, so normalise x.com → twitter.com
	var tweetUrl = src.replace(/^(https?:\/\/)x\.com\//, "$1twitter.com/");
	replaceImg(img, makeTwitterEmbed(tweetUrl));
	hasTweet = true;
	return;
}
```

然后就可以正常的嵌入 Youtube 和 X 的链接了。

![](https://x.com/imbGZo/status/1986569052161253708)

![](https://www.youtube.com/watch?v=IHENIg8Se7M)

## Jekyll 支持 Callout

因为 Jekyll + kramdown 天然不支持这些扩展语法，因此唯一的思路就是在渲染页面之前捕获这些元素，然后进行 HTML 内容渲染。

因此，我们增加一个组件：

```html
<!-- Transform GFM-style callouts: > [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!CAUTION] -->
<script>
  (function () {
    var TYPES = {
      NOTE: "Note",
      TIP: "Tip",
      WARNING: "Warning",
      IMPORTANT: "Important",
      CAUTION: "Caution",
    };

    // ── SVG icon paths ────────────────────────────────────────────────────────
    // Each value is the `d` attribute of a single <path> on a 24×24 viewBox.
    // Leave a string empty to show no icon for that type.
    var SVG_PATHS = {
      NOTE: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
      TIP: "M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z",
      WARNING:
        "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
      IMPORTANT:
        "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
      CAUTION:
        "M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
    };
    // ─────────────────────────────────────────────────────────────────────────

    var SVG_NS = "http://www.w3.org/2000/svg";
    var RE = /^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\[ \t]*/i;

    function makeIcon(type) {
      var d = SVG_PATHS[type];
      var svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 16 16");
      svg.setAttribute("fill", "currentColor");
      svg.setAttribute("aria-hidden", "true");
      if (d) {
        var path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        svg.appendChild(path);
      }
      return svg;
    }

    document
      .querySelectorAll("article blockquote:not([class])")
      .forEach(function (bq) {
        var firstP = bq.querySelector("p:first-child");
        if (!firstP) return;

        var firstText = firstP.firstChild;
        if (!firstText || firstText.nodeType !== 3 /* TEXT_NODE */) return;

        var m = firstText.nodeValue.match(RE);
        if (!m) return;

        var type = m[1].toUpperCase();

        // Strip the "[!TYPE] " prefix from the opening text node
        firstText.nodeValue = firstText.nodeValue.slice(m[0].length);

        // If the text node is now empty, remove it and any following hard-wrap <br>
        if (firstText.nodeValue === "") {
          var next = firstText.nextSibling;
          firstP.removeChild(firstText);
          if (next && next.nodeName === "BR") firstP.removeChild(next);
        }

        // If the first <p> is now empty, discard it entirely
        if (
          firstP.childNodes.length === 0 ||
          firstP.textContent.trim() === ""
        ) {
          bq.removeChild(firstP);
        }

        // Build the callout title element
        var titleEl = document.createElement("p");
        titleEl.className = "callout-title";
        titleEl.setAttribute("aria-label", TYPES[type]);

        var iconSpan = document.createElement("span");
        iconSpan.className = "callout-icon";
        iconSpan.appendChild(makeIcon(type));

        var labelSpan = document.createElement("span");
        labelSpan.textContent = TYPES[type];

        titleEl.appendChild(iconSpan);
        titleEl.appendChild(document.createTextNode("\u00a0"));
        titleEl.appendChild(labelSpan);

        bq.insertBefore(titleEl, bq.firstChild);
        bq.classList.add("callout", "callout-" + type.toLowerCase());
      });
  })();
</script>
```

需要说明下，样式和颜色的灵感来自 [GitHub](https://github.com/orgs/community/discussions/16925) 。支持种类也是直接照搬 GitHub。具体如下：

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

相关 CSS 我就不贴在这里了，感兴趣的朋友可以直接照搬本博客的 部分 CSS。

## 引入 SEED 时间线

最近执迷于把自己的闲言碎语也同步到博客中去，思考再三，决定在引入两个分类：

- SEEDS
- STORIES

前者是碎碎念，后者是一些叙事类的内容。有什么区别呢？

STORIES 聚焦于我自己身上发生的事情，我养过的 XXX 只猫，我的游戏账号被封了，我的大学等等，SEEDS 就更加大杂烩了，不属于 LABS、THOUGHTS、STORIES 的都会放在里面，正如其名，有一天他们会变成三者之一。

于是，除了增加一个专栏之外，还有两项项改动

### 对 RSS 进行过滤

保证 SEEDS 不要输出到 RSS 中，具体这样做：

```ruby
{% assign rss_articles = site.articles
| where_exp: "item", "item.path contains '_articles/labs/' or item.path contains '_articles/thoughts/' or item.path contains '_articles/stories/'"
| sort: "created"
| reverse %}
```

### 时间线分页

我们有两种改造方案：

1. 纯静态分页，即某个分页是一个静态页面；
2. 动态分页，生成分页 JSON，然后动态渲染；

对于这种动态数据，我更倾向于输出 JSON，因为输出纯静态虽然容易被搜索引擎收录，但是收录的其实往往是旧的信息，也会产生很多分页的垃圾页面，听不喜欢的，如果你有需求，可以参考官方的 [教程](https://jekyll.ruby-lang.org.cn/docs/pagination/)，用 [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2) 实现。

第二种方案，没有现成的插件给我们用，因此我们只能自己写插件，对没错，如果需要生成序列化的 JSON，第一版模板文件如下：

```ruby
---
layout: none
permalink: /posts.json
---
{%- assign all_posts = site.articles | sort: "created" | reverse -%}
{%- assign filtered = "" | split: "" -%}
{%- for post in all_posts -%}
  {%- unless post.path contains '_articles/archives/' -%}
    {%- assign filtered = filtered | push: post -%}
  {%- endunless -%}
{%- endfor -%}
[{%- for post in filtered -%}
{"title":{{ post.title | jsonify }},"url":{{ post.url | relative_url | jsonify }},"date":"{{ post.created | date: '%Y/%m/%d' }}","datetime":"{{ post.created | date: '%F' }}","desc":{{ post.description | default: "" | truncate: 200 | jsonify }}}{% unless forloop.last %},{% endunless %}
{%- endfor -%}]
```

这是最简单的，相当于自定义一个模板文件，把所有文章都塞进去，但是这其实是一个假分页，因为所有的数据还是一次性返回回去了，实际使用的时候，当博客数量大概是 87 个时，最终大小约为 57k，大小换算差不多 1/2。

也就是说，如果未来写 1000 篇博客，大概大小为 500K，如果有 10000 个，那个就有 5M 的大小，我觉得这个依然是一个问题，尽管传输 GZIP 会让这个提及小一些，但 10 年之后呢，10 年之后，是不是就会变的无法维护？

| 文章数   | 原始大小   | gzip 后大小 |
| ----- | ------ | -------- |
| 87    | 57KB   | ~12KB    |
| 1000  | ~655KB | ~130KB   |
| 10000 | ~6.5MB | ~1.3MB   |

如果不吹毛求疵的话，其实这个分页就够用了，但是我有强迫症，不行。好在 Jekyll 提供了这样的 API（Hook）给我们用，所以能写 Ruby 脚本实现，输出到 `_plugins/posts_api.rb`，最终实现如下：

```ruby
require 'json'
require 'fileutils'

module PostsApiGenerator
  def self.format_date(val, fmt)
    return '' unless val
    val.respond_to?(:strftime) ? val.strftime(fmt) : val.to_s
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  per_page = 5

  all_docs = site.collections['articles']&.docs
  next unless all_docs

  posts = all_docs
    .reject { |doc| doc.data['archive'] }
    .sort_by { |doc| doc.data['created'].to_s }
    .reverse

  pages = posts.each_slice(per_page).to_a
  total_pages = pages.length

  dir = File.join(site.dest, 'api', 'posts')
  FileUtils.mkdir_p(dir)

  pages.each_with_index do |batch, i|
    page_num  = i + 1
    next_page = page_num < total_pages ? page_num + 1 : nil

    data = {
      'posts' => batch.map do |doc|
        desc = (doc.data['description'] || '').to_s
        desc = desc.length > 200 ? "#{desc[0, 197]}..." : desc
        {
          'title'    => doc.data['title'].to_s,
          'url'      => doc.url,
          'date'     => PostsApiGenerator.format_date(doc.data['created'], '%Y/%m/%d'),
          'datetime' => PostsApiGenerator.format_date(doc.data['created'], '%F'),
          'desc'     => desc
        }
      end,
      'total_pages'  => total_pages,
      'current_page' => page_num,
      'next_page'    => next_page
    }

    File.write(File.join(dir, "#{page_num}.json"), JSON.generate(data))
  end

  Jekyll.logger.info 'Posts API:', "Generated #{total_pages} page(s) → /api/posts/{1..#{total_pages}}.json"
end

```

Jekyll 提供的 `site` 变量提供了很多可用数据和路径：

- `site.source`：源目录
- `site.dest`：输出目录
- `site.collections['articles'].docs`：集合文档对象
- `doc.data`：front matter 数据（比如 `created`、`archive`）
- `doc.url`：该文章最终 URL
- `Jekyll.logger`：构建日志输出

本质上就是 Jekyll 提供某一阶段的生命周期 HOOK 能力，让我们跑自己的代码。

## 修正 Favicon.ico

有些服务获取站点图标的方式就是请求 `/favicon.ico`，但很多 Jekyll 站点并不会真的把 favicon 放在根目前，其实就可以通过上一届的 HOOK 能力来实现一次拷贝，如下：

```ruby
 # Copy favicon.ico to the root directory
  source_favicon = File.join(site.source, 'assets', 'favicons', 'favicon.ico')
  target_favicon = File.join(site.dest, 'favicon.ico')

  if File.exist?(source_favicon)
    FileUtils.cp(source_favicon, target_favicon)
    Jekyll.logger.info 'Favicon:', 'Copied /assets/favicons/favicon.ico -> /favicon.ico'
  else
    Jekyll.logger.warn 'Favicon:', "Source file not found: #{source_favicon}"
  end
```