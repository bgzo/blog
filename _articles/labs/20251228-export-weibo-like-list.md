---
title: 导出微博喜欢列表
aliases: ['导出微博喜欢列表']
created: 2025-12-28 15:22:59
modified: 2026-04-11 18:50:19
published: 2025-12-28 15:22:59
tags: ['export-to-obsidian', 'public', 'writing/lab']
draft: False
description: 与 导出 V2ex 的收藏主题 和 导出知乎收藏夹 的理由相似，一来为了做复盘，而来为了备份自己账号的数据，玩意哪天账号被封禁了，或者不想要了，直接可以抛弃，做到没有成本。 实现 接口比较简单，没有加密，核心逻辑如下： 不用你说我都知道代码套了这么多层有点恶心，但是请允许我先吐槽一下微博为的报文， 因为好多之前的微博被删了，或者博主不展示了，所以列表里面就会展示一些不规范的报文： 加上我也懒得适配...
---

与 导出 V2ex 的收藏主题 和 导出知乎收藏夹 的理由相似，一来为了做复盘，而来为了备份自己账号的数据，玩意哪天账号被封禁了，或者不想要了，直接可以抛弃，做到没有成本。

## 实现

接口比较简单，没有加密，核心逻辑如下：

```python
def weibo(uid: int, output: str, force: bool):
    result_index = "";
    page_index = 1
    while True:
        page = get_weibo_like_list(uid, page_index)
        if page is None:
            print("获取微博喜欢列表失败，请检查接口")
            break

        if page.ok == 1:
            list = page.data.list
            if len(list) == 0:
                break

            for item in list:
                try:
                    post_id = item.mblogid
                    post_user = item.user.id
                    post_url = f"https://weibo.com/{post_user}/{post_id}"
                    filename = f"{post_user}-{post_id}"

                    # 提前剪枝
                    if not force:
                        file_path = os.path.join(output, f"~{filename}.md")
                        if os.path.exists(file_path):
                            print(f"已存在: {filename}.md，同步结束")
                            print("导出index\n", result_index)
                            return

                    auther_name = item.user.screen_name
                    context_digest = get_clean_filename(item.text_raw[:10])
                    title = auther_name + ":" + context_digest

                    created_at_str = item.created_at
                    article = item.text_raw
                    # 如果是长文本
                    if item.isLongText:
                        longtext = get_weibo_longtext_by_id(post_id)
                        if longtext is not None:
                            article = get_weibo_longtext_by_id(post_id)

                    # %a: 缩写星期 (Wed)
                    # %b: 缩写月份 (Dec)
                    # %d: 日期 (24)
                    # %H:%M:%S: 时间 (04:08:45)
                    # %z: 时区偏移 (+0800)
                    # %Y: 年份 (2025)
                    dt_obj = datetime.strptime(created_at_str, "%a %b %d %H:%M:%S %z %Y")
                    webpage = WebPage(
                        comments=True,
                        draft=True,
                        title=title,
                        source=post_url,
                        created=dt_obj.strftime("%Y-%m-%dT%H:%M:%S"),
                        modified=dt_obj.strftime("%Y-%m-%dT%H:%M:%S"),
                        type="archive-web"
                    )
                    md = dump_markdown_with_frontmatter(
                        webpage.__dict__,
                        article + '\n\n' + handle_weibo_pic(item)
                    )
                    output_content_to_file_path(
                        output,
                        filename,
                        md,
                        "md")

                    print(f"Done: {title}")
                    result_index += f'\n- {title}'

                except Exception as e:
                    print(f"处理报文发生错误: {e}，微博可能已经被删除，跳过处理")

            page_index += 1

        else:
            print("获取微博喜欢列表失败，请检查接口")
            break

def handle_weibo_pic(item) -> str:
    if item.pic_num is None or item.pic_num == 0 or item.pic_ids is None or len(item.pic_ids) == 0 :
        return ""
    result = ""
    pic_infos = item.pic_infos
    for pic_id in item.pic_ids:
        pic_info = pic_infos[pic_id]
        url = pic_info.largest['url']
        result += f"![{pic_id}]({url})\n\n"
    return result
```

不用你说我都知道代码套了这么多层有点恶心，但是请允许我先吐槽一下微博为的报文， 因为好多之前的微博被删了，或者博主不展示了，所以列表里面就会展示一些不规范的报文：

```json
{
	"visible": {
	  "type": 0,
	  "list_id": 0
	},
	"created_at": "Thu May 22 15:26:53 +0800 2025",
	"id": 5169124633215311,
	"idstr": "5169124633215311",
	"mid": "5169124633215311",
	"mblogid": "Pt0fldurR",
	"source": "",
	"attitudes_status": 1,
	"deleted": "1",
	"share_repost_type": 0,
	"showFeedRepost": false,
	"showFeedComment": false,
	"pictureViewerSign": false,
	"showPictureViewer": false,
	"rcList": [],
	"analysis_extra": "",
	"readtimetype": "mblog",
	"mblog_feed_back_menus_format": [],
	"isAd": false,
	"isSinglePayAudio": false,
	"text": "抱歉，此微博已被删除。查看帮助：<a target=\"_blank\" href=\"https://t.cn/EAL6hw7\"><img class=\"icon-link\" src=\"https://h5.sinaimg.cn/upload/2015/09/25/3/timeline_card_small_web_default.png\"/>网页链接</a>",
	"text_raw": "抱歉，此微博已被删除。查看帮助：http://t.cn/EAL6hw7"
  }
```

加上我也懒得适配了，所以就写成这样了，嘻嘻。

## 局限

当然这样的实现非常快，且仍然有几个局限：

1. **图片防盗链**，在一些没有防盗链处理的地方，比如编辑器，图片会显示，但是像是黑曜石这里就无法显示；
2. **Cookie 过期时间**，过期时间还不明确，但大概不超过半个月，也就是说，如果想要每周进行数据导出的话，需要每周事先去对应的页面去抓包获取 Cookie，确实有点扯。。。

### 如何使用

```shell
pipx install export_to_obsidian
export WEIBO_COOKIE=""
eto weibo -u xxx -o ./weibo
```

`-u` 是你的用户 ID，可以去页面路由中取得，如：

```shell
https://weibo.com/u/page/like/xxx
```

xxx 就是你的 UID