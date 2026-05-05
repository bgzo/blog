---
title: Sync venera data to Bangumi
aliases: ['Sync venera data to Bangumi']
created: 2026-05-03 09:59:37
modified: 2026-05-06 00:18:45
published: 2026-05-04 09:59:37
tags: ['bangumi', 'flutter', 'gtd/todo', 'public', 'venera', 'writing/lab']
comments: True
draft: False
description: 其实我一直在 iPad 上用魔改的 venera (漫阅) 看漫画 ，他其实已经提供了追踪器跟踪的功能，只是不太好用（需要手动关联，总是失败），加上开发者长时间不修，也不看群，我感觉已经不再维护。 一致挺喜欢 venera 的，得益于 Flutter 跨平台，它提供了 ipa，可以在 iPad 上测载看漫画，体验上和 Mihon 非常接近，配合上 WebDev 同步，已经是一个不错的全平台解决方案...
---

其实我一直在 iPad 上用魔改的 venera (漫阅) 看漫画 [^man-yue]，他其实已经提供了追踪器跟踪的功能，只是不太好用（需要手动关联，总是失败），加上开发者长时间不修，也不看群，我感觉已经不再维护。

[^man-yue]: 一个魔改的 venera，违反 GPL-3.0 协议，直接闭源了，25 年末上架的时候卖 6 块，我就付费了，现在转为订阅了，永久买断 15 刀，比较离谱。这个作者手下也有一堆类似的软件（书阅、云映等等），只不过大部分已经在国区下架了，外区也是迟早的事情

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/1777774637105.webp)

一致挺喜欢 venera 的，得益于 Flutter 跨平台，它提供了 ipa，可以在 iPad 上测载看漫画，体验上和 [Mihon](https://github.com/mihonapp/mihon) [^mihon-only-android] 非常接近，配合上 WebDev 同步，已经是一个不错的全平台解决方案了。

[^mihon-only-android]: Mihon 只提供了 Android，因为它就是原生写的，插件也是用 APK 写的。如果他要跨平台需要走 [ Kotlin Multiplatform](https://kotlinlang.org/multiplatform/ ) 那一套。

只是上个月 4 号，非常遗憾，它居然存档了！虽然已经有人 [接手](https://github.com/haukuen/venera) 了，但还不确定未来在哪里。

## Why not PR

我其实构想过一个比较好的未来：就是 [ venera-app  ](https://github.com/venera-app ) 可以把后续发展给社区，其实你能看到之前的大部分工作都是 [@wgh136](https://github.com/wgh136) 和 [@ynyxx ]( https://github.com/ynyxx ) 来做的，可能负担比较重？

然后，漫阅拿去做付费其实不在 GPL 协议违规范围内，其实他可以开源另一个版本，然后靠 AppStore 继续盈利，一来遵守维持协议，二来也能保持项目之间协作。前提是 AppStore 可以容忍这种软件存在，不会被人举报下架。

在这方面我们和 Apple 还有很长的路要走，

一方面是能方便我这样的小白，另一方面也能让 venera 可以走的更远，现在我想提 PR，也不知道改提给我，而且我用 iOS 魔改的 venera，已经只差临门一脚的修复了，如果可以，我不太想重复造轮子。

## 解析 Venera 数据

一开始还纠结怎么打开 venera 导出的格式，直接用 VSCode 打开是一坨乱码，直到看到 venera 的导出实现：

```dart
// lib/utils/data.dart
Future<File> exportAppData([bool sync = true]) async {
  var time = DateTime.now().millisecondsSinceEpoch ~/ 1000;
  var cacheFilePath = FilePath.join(App.cachePath, '$time.venera');
  var cacheFile = File(cacheFilePath);
  var dataPath = App.dataPath;
  if (await cacheFile.exists()) {
    await cacheFile.delete();
  }
  await Isolate.run(() {
    var zipFile = ZipFile.open(cacheFilePath);
    var historyFile = FilePath.join(dataPath, "history.db");
    var localFavoriteFile = FilePath.join(dataPath, "local_favorite.db");
    var appdata = FilePath.join(dataPath, sync ? "syncdata.json" : "appdata.json");
    var cookies = FilePath.join(dataPath, "cookie.db");
    zipFile.addFile("history.db", historyFile);
    zipFile.addFile("local_favorite.db", localFavoriteFile);
    zipFile.addFile("appdata.json", appdata);
    zipFile.addFile("cookie.db", cookies);
    for (var file
        in Directory(FilePath.join(dataPath, "comic_source")).listSync()) {
      if (file is File) {
        zipFile.addFile("comic_source/${file.name}", file.path);
      }
    }
    zipFile.close();
  });
  return cacheFile;
}
```

明朗多了，是一个压缩包，改名 zip，解压之后我们可以得到

```shell
❯ tree . -L 3
.
├── appdata.json
├── comic_source # js 漫画源，忽略
├── cookie.db
├── history.db
└── local_favorite.db

2 directories, 43 files
```

于是我们就能拿到 `local_favorite.db` 内部的数据，用于数据同步。接着我们就能进行数据解析，最终把这些数据全部转化为一个刻度的 JSON 包：

```shell
python3 src/parser.py dump 20575-2273.venera --include-rows --pretty -o venera_dump.json
```

## 匹配 Bangumi

一个比较大的问题是 venera 天然不与 bangumi 绑定：

```json
{
  "author": "",
  "cover_path": "https://public.komiic.com/comics/4eba50e2fe4d6752d334e7bb943e1455/cover.jpg",
  "display_order": 72,
  "has_new_update": null,
  "id": "1407",
  "last_check_time": 1777659880559,
  "last_update_time": "2026-1-11",
  "name": "青之驅魔師",
  "tags": "作者:加藤和惠,标签:校園,标签:冒險,标签:魔幻,标签:魔法,标签:格鬥",
  "time": "2026-04-08 00:19:02",
  "translated_tags": "",
  "type": 637999886
},
```

所以最大的一个问题其实变成了如何匹配 Bangumi 的数据，存在非常多情况

1. 简繁体不匹配
2. 符号差异
3. 别名冲突
4. 无关搜索

这些一一解决之后，我的样本数据基本都跑完了，所以没有办法保证未来新增的数据依然有效，但是只能这样一点点迭代了。

## 如何使用

1. 从源码 https://github.com/bgzo/playground/tree/2026/05/venera-parser-bangumi-sync
 构建

```shell
git clone --branch 2026/05/venera-parser-bangumi-sync https://github.com/bGZo/playground.git
cd playground
pipx install .
```

2. 直接安装

```shell
pipx install venera-parser-bangumi
```