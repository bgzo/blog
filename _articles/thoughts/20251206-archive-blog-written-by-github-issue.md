---
title: 用 GitHub issue 写博客很好，但我要放弃了
aliases: ['用 GitHub issue 写博客很好，但我要放弃了']
created: 2025-12-06 11:15:36
modified: 2026-04-11 18:50:20
published: 2025-12-06 11:15:36
tags: ['public', 'writing/thought']
comment: True
draft: False
description: 这曾经是一个比火热的写作方式，至少在 2020 年是如此，我也是听、看 laike9m 和 yihong618 的项目慢慢摸索的，它有很多优点，比如至少解决了如下的问题： 1. 文章托管：所有文件放在 GitHub，他的稳定性至少要比你电脑的寿命要长； 2. 图片引用：所有本地写过博客的人一定头疼过如何上传图片，这方面不赘述了； 3. SEO 索引：GitHub issue 自带 SEO 索引，会...
---

这曾经是一个比火热的写作方式，至少在 2020 年是如此，我也是听、看 laike9m 和 yihong618 的项目慢慢摸索的，它有很多优点，比如至少解决了如下的问题：

1. 文章托管：所有文件放在 GitHub，他的稳定性至少要比你电脑的寿命要长；
2. 图片引用：所有本地写过博客的人一定头疼过如何上传图片，这方面不赘述了；
3. SEO 索引：GitHub issue 自带 SEO 索引，会被浏览器抓取；
4. 评论功能：你不需要折腾、嵌入评论插件，完全可以用 GitHub 自带的那一套；

好处应该还有很多，比如全文搜索和标签管理，这里就不赘述了，让我讲讲为什么我要放弃它吧。

## 「写作不流畅」

如果你要写一篇文章，你的第一步应该是什么？是不是像我一样打开 Obsidian、Logseq、或者苹果备忘录？甚至打开一个记事本就直接开始写了？

写到这里，答案应该明了了，总之，不可能是打开 GitHub，然后点击 Issue，再点击 Create，然后再写，真要结合国内的网络情况，想写的东西早就忘记了。所以过去的几年里，我都是本地写好了，然后检查一遍，最后上传到 GitHub Issue 里面。

这当然是一个不错的主意，但仍然有问题：如果有一天你发现文章有些地方写的有纰漏，然后直接在 issue 里面改了，然后就发布了，那你本地的文章怎么办？是不是还得改一遍？文章的一致性非常难保证。

反复的编辑和校对会把所有表达的欲望耗尽，最后什么也写不出来。

## 「污染 GitHub 工作流」

首先，issue 的诞生就不是用来写博客的，写博客只是 issue 的一种用法，用于追踪定位问题，换种严肃的说法就是，这本来就是一种邪修的路子，早晚会出问题。

比如我想看自己创建过的 issue，我们可以去 https://github.com/issues/created, 但因为你拿 issue 做博客了，所以这里默认全都是你还处于打开状态的博客，你当然可以通过 `-repo:xxx/blog` 这个搜索参数来过滤你的统计结果，但这总不如默认提供来的直观、方便。

然后，还会有更多不可预料的副作用，比如官方有一个跨项目的 issue 联动功能，就是如果你在项目 A 的 issue 里面引用了项目 B 的 issue，双方的 issue 时间线里面就会出现一个双向链接 [^double-link]，这对解决过定位共性问题有帮助，但如果不是为了解决问题，这个功能就有点「滥用」的味道。

[^double-link]: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues#about-integration-with-github

试想，如果我把一个热门的项目全都重定向到我的博客，我当然可以获得海量的流量，但我离封号也不远了 😊 如果裁决人是你，「要不要封」这件事情一定也很明了。

总之，你没有选择，只要 GitHub 做更多相关的集成操作，那么对你来说就是更多的负担。

## 还有更好的方式吗？

想说的话说完了，这就是我的博客 https://blog.bgzo.cc 停更快一年的主要原因。至于未来在哪，很难说，因为 GitHub 已经实现了近乎博客需要的所有功能了，如果要放弃它，你不得不重新实现一遍我在开头说的那些功能。

Sounds hard really.

别忘了我们的初衷，只是想写点能被保管时间久点的东西，或是愉悦自己，或是愉悦他人，而不是克隆一个成熟的科技轮子。

## 后话：谈谈项目的实现细节和我博客的后路

闲话终于写完了，可以写点代码相关的东西了🥰

首先我想说实现整个项目很蛮有趣的，我在 GitHub issue 上写博客，然后通过每日的 CI 定时的拉取数据到仓库博客目录，然后自动关联来源 issue，这样甚至可以无缝接入 https://utteranc.es/, 完美地把自己的 issue 内容和评论，用 Github Pages 展现出来。

这对 4 年前，或者 5 年前的自己来说还挺酷的，那个时候还没有 AI ，因此完全是看着别人的项目代码，然后摸石头过河。

### 20220104 第一版发布

https://github.com/bGZo/blog/commit/428035c7167ce2899e4db9fb5d1d006d60829cc3

当然剩下的博客框架久随便选了，但是我已经用过了 hugo、hexo 和非常多在线工具，对 GitHub 自带的 jekyll 还不熟悉，所以自从看了这位老哥的博客，我就动手开始模仿了起来：

<iframe src='https://dzhavat.github.io' style='height:40vh;width:100%' class='iframe-radius' allow='fullscreen'></iframe>
<center>via: <a href='https://dzhavat.github.io' target='_blank' class='external-link'>https://dzhavat.github.io</a></center>

这是我模仿的结果：

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2025/202507022230006.png)

### 内容获取

设计有几点约定：

1. 用标签来进行 issue 分类，比如我的 `post`、`threads`、`thoughts`、`letters` 等等，没有分类的标签不会出现在博客里面；
2. 自定义标题需要写在文内，常规的路由名字会用 issue 标题加中线符号进行组合；

剩下的就是用 PyGithub 获取 issue 列表和内容，拼凑出 jekyll 需要的格式了，核心代码有：

```python
def output_label_articles(_repo, _name, _label):
    issues = _repo.get_issues(
                labels=[_repo.get_label( _label )],
                creator=_name,
                state='open')
```

### 自动化 CI 更新仓库

上面我们把脚本确定好，然后在 `.github` 内部创建好 yaml 文件，主要是制定运行日期，比如东八区 0 点，就是对应的 UTC+0 的 16 点， 核心代码有：

```yaml
on:
  workflow_dispatch:
  push:
    branches: [ main ]
  schedule:
    - cron:  '0 16 * * *'
```

CI 的思路也简单粗暴：先删掉当前的缓存文章，再执行一遍脚本即可，如：

```python
- name: Delete All Old Post
  run: |
  rm -rf _posts/
- name: Sync issue to repository
  run: |
  python3 utils/sync.py -t ${{ secrets.G_T }} -p bGZo/blog posts thoughts letters
- name: Proof article
  run: |
  python3 utils/proof.py
- name: Convert Text to Traditional Chinese
  run: |
  python3 utils/stconverter.py _posts -t
```

除了 CI，还能通过 GitHub 自己提供的 `ISSUE_TEMPLATE` 来简化 issue 的创建过程；

### 博客评论:giscus

因为 https://utteranc.es/ 天然就是用 issue 来做评论存储的，所以我们只需要在脚本构建中，加入博文和 issue 的绑定关系，并且嵌入如下代码，即可生效：

```html
<script src="https://utteranc.es/client.js"
  repo="bgzo/blog"
  theme="preferred-color-scheme"
  issue-number="{{ page.number }}"
  crossorigin="anonymous"
  async>
</script>
```

当然还有几种选择，如：

- utterances
- gitalk: not support name matching;
	- https://github.com/gitalk/gitalk.github.io/blob/master/index.html
	- https://github.com/gitalk/gitalk/issues/1

20230304

### 博客美化

没啥用，但是确实自认为美化了好几版，就当看个乐呵吧。

#### 20230128 字体换了好几波

最开始喜欢用微软雅黑，但是雅黑不是衬线字体，后面就换成了 lxgw-wenkai-webfont，但楷体不符合中国人的阅读习惯，最终还是换回了宋体（[Noto Serif Simplified Chinese - Google Fonts](https://fonts.google.com/noto/specimen/Noto+Serif+SC/about)）。

#### 20230131 自动替换半角符号

因为之前敲代码的关系，标点符号全部设置的是半角，这让中文排版最终糊成一坨，所以最好在发布的时候替换为全角符号。

- [x] `,` 替换
- [x] `.` 替换
- [x] 结尾空格替换
- [x] 脚注替换
- [x] | 替换
- [x] 链接转义

#### 20230228 增加黑暗模式

抽空修整并优化了下博客的两个小功能（夜间模式和评论功能），夜间模式着重优化下图片遮罩，防止图片在夜晚环境过亮（Brightness of img is too dazzling in dark mode），当然一开始没想到加这些功能只需要几行代码😂，我果然还是很厉害的👍（欠下的技术债 -1）；

via:

- [Dark Mode: Reduce image brightness & contrast · Issue #618 · WordPress/twentytwentyone · GitHub](https://github.com/WordPress/twentytwentyone/issues/618)
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

### 还可以优化的点：

- [ ] 增加博客说明
	- 最好支持键盘快捷键的支持，比如：
		- https://player.fm with `?`
		- https://github.com with `?`
- [ ] 链接预览，支持社交媒体的预览
	- [ ] Telegram
	- [ ] Twitter
- [ ] 分页显示

## 未来

前面两节已经写清楚了，未来不会再在 issue 里面写博客了，但这里应该也不会闲着，我会从上游 (https://github.com/bGZo/vault) 把我一些折腾的文章拉取过来。然后再在这里进行展示。

当然，这个分支我会保留，感兴趣的人可以来这个分支抄抄作业：

而且如果你不在意我开头说的两个我认为缺点的话，GitHub issue 写博客还是最好使的，不仅仅是背靠巨硬，你懂的。