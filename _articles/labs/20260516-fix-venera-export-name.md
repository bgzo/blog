---
title: 修复 Venera 点击导出无反应，章节显示问题
aliases: ['修复 Venera 点击导出无反应，章节显示问题']
created: 2026-05-16 10:47:28
modified: 2026-05-16 15:41:31
published: 2026-05-16 15:41:31
tags: ['flutter', 'public', 'venera', 'writing/lab']
comments: True
draft: False
description: 上次修复 Venera 无法在 iOS/iPad OS 上保存图片 的问题，很可能是 iOS 的一个 BUG，因为这周升级 iOS 26.5 之后，这个奇怪的问题就消失了。 除了这个问题，上次修复还有一个遗留问题是 iOS 会自动处理超长文件名，导致如： 最终会被 iOS 系统直接截断为： 很奇怪啊，之前一直没有发现这个问题，检测文件是否存在的时候用的原始原标题，而不是截断后的，最终导致保存逻辑非...
---

上次修复 Venera 无法在 iOS/iPad OS 上保存图片 的问题，很可能是 iOS 的一个 BUG，因为这周升级 iOS 26.5 之后，这个奇怪的问题就消失了。

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/20260505230857427.webp)

除了这个问题，上次修复还有一个遗留问题是 iOS 会自动处理超长文件名，导致如：

```shell
與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png
```

最终会被 iOS 系统直接截断为：

```shell
與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう.png
```

很奇怪啊，之前一直没有发现这个问题，检测文件是否存在的时候用的原始原标题，而不是截断后的，最终导致保存逻辑非常奇怪；

定位相关的调用 `saveFile` 的地方为：

```dart
  void saveCurrentImage() async {
    var result = await selectImageToData();
    if (result == null) {
      return;
    }
    if (!mounted) return;
    var (imageIndex, data) = result;
    var fileType = detectFileType(data);
    // Save file name: ComicName_EP{chapter}_P{page}.{ext} to avoid conflict.
    // The chapter index of different group is continuous, so we use chapter number is enough.
    var filename =
        "${context.reader.widget.name}_EP${context.reader.chapter}_P${imageIndex + 1}${fileType.ext}";
    saveFile(data: data, filename: filename);
  }
```

首先这里就有两个问题：

1. 文件名字没有经过清洗，非法文件名会带来很多问题，比如上述的文件超长，特殊字符比如 `/` 会导致文件不存在的报错，如下：

```shell
flutter: PathNotFoundException: Cannot open file, path = '/Users/bgzo/Library/Containers/io.github.haukuen.venera/Data/Library/Caches/io.github.haukuen.venera/侯爵嫡男好色物語 ～異世界後宮英雄戰記～[AL/GEN] 侯爵嫡男好色物語 ～異世界ハーレム英雄戰記～_EP1_P13.png' (OS Error: No such file or directory, errno = 2)
flutter: #0      _checkForErrorResponse (dart:io/common.dart:58:9)
flutter: #1      _File.open.<anonymous closure> (dart:io/file_impl.dart:438:7)
flutter: #2      _rootRunUnary (dart:async/zone_root.dart:48:47)
flutter: #3      _CustomZone.runUnary (dart:async/zone.dart:733:19)
flutter: <asynchronous suspension>
flutter: #4      _File.writeAsBytes.<anonymous closure> (dart:io/file_impl.dart:728:34)
flutter: <asynchronous suspension>
flutter: #5      saveFile (package:venera/utils/io.dart:359:7)
flutter: <asynchronous suspension>
```

2. EP 的章节显示的是 chapter 的 ID，这个 ID 只对 Venera 有效，实际不是漫画章节

## 清洗文件名

一开始想着还得自己清洗文件名，粗糙的写了一个：

```dart
String sanitizeSaveFilename(String fileName, {int maxLength = 50}) {
  final extension = p.extension(fileName);
  final hasExtension = extension.isNotEmpty && extension.length < fileName.length;
  final reservedLength = hasExtension ? extension.length : 0;
  final nameLength = maxLength - reservedLength;
  if (nameLength <= 0) {
    throw Exception('Invalid File Name: Max length is less than extension length.');
  }
  final sanitizedBaseName = sanitizeFileName(
    hasExtension ? p.basenameWithoutExtension(fileName) : fileName,
    maxLength: nameLength,
  );
  return hasExtension ? '$sanitizedBaseName$extension' : sanitizedBaseName;
}
```

但细看代码才发现它原本就有，只是这里导出没有调用而已...

```dart
/// Sanitize the file name. Remove invalid characters and trim the file name.
String sanitizeFileName(String fileName, {String? dir, int? maxLength}) {
  while (fileName.endsWith('.')) {
    fileName = fileName.substring(0, fileName.length - 1);
  }
  var length = maxLength ?? 255;
  if (dir != null) {
    if (!dir.endsWith('/') && !dir.endsWith('\\')) {
      dir = "$dir/";
    }
    length -= dir.length;
  }
  final invalidChars = RegExp(r'[<>:"/\\|?*]');
  final sanitizedFileName = fileName.replaceAll(invalidChars, ' ');
  var trimmedFileName = sanitizedFileName.trim();
  if (trimmedFileName.isEmpty) {
    throw Exception('Invalid File Name: Empty length.');
  }
  if (length <= 0) {
    throw Exception('Invalid File Name: Max length is less than 0.');
  }
  if (trimmedFileName.length > length) {
    trimmedFileName = trimmedFileName.substring(0, length);
  }
  return trimmedFileName;
}
```

那第一个问题就秒杀了，直接调用一下即可，考虑到 Linux、Mac、Android、Widnwos，最终考虑把文件名字限制为 50 个字符。

## 章节显示

这块也是一开始想复杂了，因为它 chapterId 涉及章节定位、历史显示的问题，如果一次迁移到 chapterTitle 的话，对历史改动可能不太兼容，源之间做的也不是特别兼容，所以问题比较多。

然后看了一下其他地方的处理逻辑，我发现它其实已经做了一部分工作，比如:

```dart
// 已有逻辑1
final epName = context.reader.widget.chapters?.titles.elementAtOrNull(
    context.reader.chapter - 1,
);
// 已有逻辑2
var epName = context.reader.widget.chapters?.titles.elementAtOrNull(
  context.reader.chapter - 1,
) ?? "E${context.reader.chapter}";
```

我这才发现它上方显示的标题是正确的，然而下方显示的 EP，以及导出的文件文字的 EP 是错误的

![](https://github.com/user-attachments/assets/59f879bc-b4ee-4bd5-8879-c6858c790c82)

那这个改动就更简单了，直接提取这部分为公共逻辑即可正确展示：

```dart
String? get chapterTitle =>
    widget.chapters?.titles.elementAtOrNull(chapter - 1);

String get chapterDisplayName => chapterTitle ?? 'E$chapter';
```

直接抽象两个变量，前者是源自己的标题，如果不存在，那么 Display 自动会退为 chapter ID，这样的改动就合理多了。最终修复如下：

![](https://github.com/user-attachments/assets/9c29fb48-98ad-4e15-9f5c-bfd768bf49b0)

好多了，提 PR： https://github.com/haukuen/venera/pull/53