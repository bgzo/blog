---
title: Venera 无法在 iOS/iPad OS 上保存图片
aliases: ['Venera 无法在 iOS/iPad OS 上保存图片']
created: 2026-05-05 14:00:12
modified: 2026-05-05 23:09:35
published: 2026-04-17 14:52:49
tags: ['apple', 'flutter', 'public', 'venera', 'writing/lab']
comments: True
draft: False
description: 我之前不是说用魔改的 venera 客户端「漫阅」吗？它和官方都有一个问题，在漫画名特别长的时候，下载图片会不显示保存按钮，也就是置灰状态： 很头疼啊，我的一个坏毛病就是看到好看的章节直接下载到本地，不用官方自带的图片收藏，漫阅这个东西已经发布至少半年了，就没有一个人发现这玩意有问题吗？？？ 还好 Venera 是开源的，可以直接调试，过程比较痛苦，因为这个问题只存在 iOS 和 iPad 上面，...
---

我之前不是说用魔改的 venera 客户端「漫阅」吗？它和官方都有一个问题，在漫画名特别长的时候，下载图片会不显示保存按钮，也就是置灰状态：

![image](https://github.com/user-attachments/assets/8ac0d719-e6c9-42d4-a969-f502b8844c13)

很头疼啊，我的一个坏毛病就是看到好看的章节直接下载到本地，不用官方自带的图片收藏，漫阅这个东西已经发布至少半年了，就没有一个人发现这玩意有问题吗？？？

还好 Venera 是开源的，可以直接调试，过程比较痛苦，因为这个问题只存在 iOS 和 iPad 上面，所以只能连接 iPad 进行调试。

## Flutter requires the Rosetta translation environment

因为我用的 SDK 是 3.41.9，在连接 iPad 之后居然报错了：

```shell
Installing and launching...
The Dart VM Service was not discovered after 60 seconds. This is taking
much longer than expected...
Installing and launching...                                              227.0s
0.5
0.5
Error: Flutter failed to run
"/Users/bgzo/fvm/versions/3.41.9/bin/cache/artifacts/libusbmuxd/iproxy
49822:49622 --udid 00008130-000131EC1091401C".
The binary was built with the incorrect architecture to run on this
machine.
If you are on an ARM Apple Silicon Mac, Flutter requires the Rosetta
translation environment. Try running:
  sudo softwareupdate --install-rosetta --agree-to-license
```

卧槽，怎么可能，我们只需要干掉这个 x86 的包即可：

```shell
which iproxy

mv /Users/bgzo/fvm/versions/3.41.9/bin/cache/artifacts/libusbmuxd/iproxy /Users/bgzo/fvm/versions/3.41.9/bin/cache/artifacts/libusbmuxd/iproxy.bak

ln -s /opt/homebrew/bin/iproxy /Users/bgzo/fvm/versions/3.41.9/bin/cache/artifacts/libusbmuxd/iproxy
```

重新起服务

```shell
fvm flutter run
```

## 定位问题

一开始以为是文件名称超长的问题，修改了一下截断逻辑：

```dart
String buildIOSSaveDialogFilename(String filename, {int maxUtf8Bytes = 120}) {
  final sanitized = sanitizeFileName(filename);
  if (utf8.encode(sanitized).length <= maxUtf8Bytes) {
    return sanitized;
  }

  final extension = p.extension(sanitized);
  final hasExtension = extension.isNotEmpty && sanitized != extension;
  final baseName = hasExtension ? p.basenameWithoutExtension(sanitized) : sanitized;
  final preservedSuffix = _extractPreservedFilenameSuffix(baseName);
  final availableBaseBytes =
      maxUtf8Bytes -
      utf8.encode(extension).length -
      utf8.encode(preservedSuffix).length;

  if (!hasExtension || availableBaseBytes <= 0) {
    return _truncateUtf8Bytes(sanitized, maxUtf8Bytes);
  }

  final prefix = preservedSuffix.isEmpty
      ? baseName
      : baseName.substring(0, baseName.length - preservedSuffix.length);
  final truncatedBaseName = _truncateUtf8Bytes(prefix, availableBaseBytes);
  if (truncatedBaseName.isEmpty) {
    return _truncateUtf8Bytes(sanitized, maxUtf8Bytes);
  }

  return truncatedBaseName + preservedSuffix + extension;
}

String _extractPreservedFilenameSuffix(String baseName) {
  final chapterSuffix = RegExp(r'(_EP\d+_P\d+)$').firstMatch(baseName);
  return chapterSuffix?.group(0) ?? '';
}

String _truncateUtf8Bytes(String value, int maxUtf8Bytes) {
  if (maxUtf8Bytes <= 0 || value.isEmpty) {
    return '';
  }

  final buffer = StringBuffer();
  var currentBytes = 0;
  for (final rune in value.runes) {
    final char = String.fromCharCode(rune);
    final charBytes = utf8.encode(char).length;
    if (currentBytes + charBytes > maxUtf8Bytes) {
      break;
    }
    buffer.write(char);
    currentBytes += charBytes;
  }
  return buffer.toString();
}
//...
Future<void> saveFile({
  Uint8List? data,
  required String filename,
  File? file,
}) async {
  if (data == null && file == null) {
    throw Exception("data and file cannot be null at the same time");
  }
  IO._isSelectingFiles = true;
  try {
	// 改造点
    final mobileFilename =  App.isIOS?
	    buildIOSSaveDialogFilename(filename)
	    :filename;
    if (data != null) {
      var cache = FilePath.join(App.cachePath, mobileFilename);
      if (File(cache).existsSync()) {
        File(cache).deleteSync();
      }
      await File(cache).writeAsBytes(data);
      file = File(cache);
    }
    if (App.isMobile) {
      final params = SaveFileDialogParams(
        sourceFilePath: file!.path,
        // 仅当 iOS 生效
        fileName: App.isIOS ? mobileFilename : null,
      );
      await FlutterFileDialog.saveFile(params: params);
    } else {
      final result = await file_selector.getSaveLocation(
        suggestedName: filename,
      );
      if (result != null) {
        var xFile = file_selector.XFile(file!.path);
        await xFile.saveTo(result.path);
      }
    }
  } finally {
    Future.delayed(const Duration(milliseconds: 100), () {
      IO._isSelectingFiles = false;
    });
  }
}
```

然后发现问题修复了，太好了。因为这个问题 Mac 上无法复现，所以我有点纳闷，因为这可能意味着这不是系统文件名长度的限制，也就是可能并不是文件截断的问题，于是我尝试吧原本超长的文件名替换进去，发现 Files 还是可以写入的。

实锤了，肯定不是文件名的问题，然后删删改改，把上面添加的 `buildIOSSaveDialogFilename` 函数移除之后，我发现问题也被解决了。

发现依然可以正常写入，我 TM 更纳闷了，也就是说，其实影响 iOS/iPad OS 弹窗保存的，仅仅是 params 的一个参数！

```dart
// FIX: iOS export dialog cannot show filename and save.
final params = SaveFileDialogParams(
  sourceFilePath: file!.path,
  fileName: App.isIOS ? filename : null,
);
await FlutterFileDialog.saveFile(params: params);
```

为什么啊？

最终定位到 Swift 的源码，可以看到仅仅是多走了一个复制分支的事情，然后这个问题就解决了？！没有办法，加点日志在上面，重新启动看看调用过程：

```swift
// /Users/bgzo/.pub-cache/hosted/pub.dev/flutter_file_dialog-3.0.3/ios/Classes/SaveFileDialog.swift
// Copyright (c) 2020 KineApps. All rights reserved.
//
// This source code is licensed under the BSD-style license found in the
// LICENSE file in the root directory of this source tree.

import Foundation
import UIKit

class SaveFileDialog: NSObject, UIDocumentPickerDelegate {
    private var flutterResult: FlutterResult?
    private var params: SaveFileDialogParams?
    private var tempFileUrl: URL?

    deinit {
        writeLog("")
        deleteTempFile()
    }

    func saveFileToDirectory(_ params: SaveFileToDirectoryParams, result: @escaping FlutterResult) {
        if params.data == nil {
            result(FlutterError(code: "invalid_arguments",
                                message: "Missing 'data'",
                                details: nil)
            )
            return
        }

        if params.directory == nil {
            result(FlutterError(code: "invalid_arguments",
                                message: "Missing 'directory'",
                                details: nil)
            )
            return
        }

        var directory: URL?
        do {
            var isStale = false
            directory = try URL(resolvingBookmarkData: Data(base64Encoded: params.directory!)!, bookmarkDataIsStale: &isStale)
            if (isStale) {
                result(FlutterError(code: "accessing_stale",
                                    message: "picked directory accessing staled",
                                    details: nil)
                )
                return
            }
        } catch let error {
            result(FlutterError(code: "invalid_arguments",
                                message: "invalid 'directory' data",
                                details: error.localizedDescription)
            )
            return
        }

        if params.fileName == nil || params.fileName!.isEmpty {
            result(FlutterError(code: "invalid_arguments",
                                message: "Missing 'fileName'",
                                details: nil)
            )
            return
        }

        let fileUrl = directory!.appendingPathComponent(params.fileName!, isDirectory: false)

        if FileManager.default.fileExists(atPath: fileUrl.path) {
            if !params.replace {
                result(FlutterError(code: "file_already_exists",
                                    message: "File already exists: '\(fileUrl.absoluteString)'",
                                    details: nil)
                )
                return
            }

            do {
                try FileManager.default.removeItem(at: fileUrl)
            } catch let error {
                result(FlutterError(code: "file_remove_failed",
                                    message: error.localizedDescription,
                                    details: nil)
                )
                return
            }
        }

        let fileContents = Data(bytes: params.data!, count: params.data!.count)
        do {
            try fileContents.write(to: fileUrl)
        } catch {
            result(FlutterError(code: "file_create_failed",
                                message: error.localizedDescription,
                                details: nil)
            )
            return
        }

        result(fileUrl.path)
    }

	// 调用点
    func saveFile(_ params: SaveFileDialogParams, result: @escaping FlutterResult) {
        flutterResult = result
        self.params = params
        writeLog(buildParameterLog(params))

        var fileUrl: URL?

        if params.data == nil {
            // get source file URL
            guard let sourceFilePath = params.sourceFilePath else {
                result(FlutterError(code: "invalid_arguments",
                                    message: "Missing 'sourceFilePath'",
                                    details: nil)
                )
                return
            }

            // note: fileExists fails if path contains relative elements, so standardize the path
            fileUrl = URL(fileURLWithPath: sourceFilePath).standardized
            writeLog(describeUrl("sourceFileUrl", fileUrl!))

            // check that source file exists
            if !FileManager.default.fileExists(atPath: fileUrl!.path) {
                result(FlutterError(code: "file_not_found",
                                    message: "File not found: '\(fileUrl!.path)'",
                                    details: nil)
                )
                return
            }
        }

        // if file name was specified, create a temp file with the requested file name
        if params.fileName != nil {
            let directory = NSTemporaryDirectory()
            tempFileUrl = NSURL.fileURL(withPathComponents: [directory, params.fileName!])
            writeLog(describeUrl("tempFileUrl", tempFileUrl!))

            do {
                // overwrite existing file
                if FileManager.default.fileExists(atPath: tempFileUrl!.path) {
                    try FileManager.default.removeItem(at: tempFileUrl!)
                }

                if params.data != nil {
                    writeLog("Writing data \(params.data!.count) bytes to temp file \(tempFileUrl!)")
                    let d = Data(bytes: params.data!, count: params.data!.count)
                    try d.write(to: tempFileUrl!)
                } else {
                    writeLog("Copying \(fileUrl!) to \(tempFileUrl!)")
                    try FileManager.default.copyItem(at: fileUrl!, to: tempFileUrl!)
                }
            } catch {
                writeLog(error.localizedDescription)
                result(FlutterError(code: "creating_temp_file_failed",
                                    message: error.localizedDescription,
                                    details: nil)
                )
                return
            }
            fileUrl = tempFileUrl!
        }

        writeLog(describeUrl("documentPickerExportUrl", fileUrl!))

        // get parent view controller
        guard let parentViewController = UIApplication.shared.keyWindow?.rootViewController else {
            result(FlutterError(code: "fatal",
                                message: "Getting rootViewController failed",
                                details: nil)
            )
            return
        }

        // create document picker
        let documentPickerViewController = UIDocumentPickerViewController(url: fileUrl!, in: .exportToService)
        documentPickerViewController.delegate = self

        // show dialog
        parentViewController.present(documentPickerViewController, animated: true, completion: nil)
    }

    private func deleteTempFile() {
        if tempFileUrl != nil {
            do {
                if FileManager.default.fileExists(atPath: tempFileUrl!.path) {
                    writeLog("Deleting temp file \(tempFileUrl!)")
                    try FileManager.default.removeItem(at: tempFileUrl!)
                }
                tempFileUrl = nil
            } catch {
                writeLog(error.localizedDescription)
            }
        }
    }

    // MARK: - UIDocumentPickerDelegate

    public func documentPicker(_: UIDocumentPickerViewController, didPickDocumentAt url: URL) {
        writeLog("didPickDocumentAt")
        deleteTempFile()
        flutterResult?(url.path)
    }

    public func documentPicker(_: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        writeLog("didPickDocumentsAt")
        deleteTempFile()
        flutterResult?(urls[0].path)
    }

    public func documentPickerWasCancelled(_: UIDocumentPickerViewController) {
        writeLog("documentPickerWasCancelled")
        deleteTempFile()
        flutterResult?(nil)
    }

    private func buildParameterLog(_ params: SaveFileDialogParams) -> String {
        let sourcePath = params.sourceFilePath ?? "nil"
        let requestedFileName = params.fileName ?? "nil"
        let sourcePathUtf8Count = sourcePath == "nil" ? 0 : sourcePath.lengthOfBytes(using: .utf8)
        let fileNameUtf8Count = requestedFileName == "nil" ? 0 : requestedFileName.lengthOfBytes(using: .utf8)
        return "saveFile params sourceFilePath=\(sourcePath) sourceFilePath.utf8=\(sourcePathUtf8Count) fileName=\(requestedFileName) fileName.utf8=\(fileNameUtf8Count) dataBytes=\(params.data?.count ?? 0)"
    }

    private func describeUrl(_ label: String, _ url: URL) -> String {
        let path = url.path
        let fileName = url.lastPathComponent
        return "\(label) path=\(path) path.utf8=\(path.lengthOfBytes(using: .utf8)) path.count=\(path.count) fileName=\(fileName) fileName.utf8=\(fileName.lengthOfBytes(using: .utf8)) fileName.count=\(fileName.count)"
    }
}

```

调试打印日志

```shell
2026-05-05 07:30:29 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 07:30:29 +0000 [SaveFileDialog.swift:15 deinit]
2026-05-05 07:30:29 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/[漫漫長夜翻譯組] [よのき] 鬼畜英雄_EP106_P6.png sourceFilePath.utf8=153 fileName=nil fileName.utf8=0 dataBytes=0
2026-05-05 07:30:29 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/[漫漫長夜翻譯組] [よのき] 鬼畜英雄_EP106_P6.png path.utf8=153 path.count=125 fileName=[漫漫長夜翻譯組] [よのき] 鬼畜英雄_EP106_P6.png fileName.utf8=61 fileName.count=33
2026-05-05 07:30:29 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/[漫漫長夜翻譯組] [よのき] 鬼畜英雄_EP106_P6.png path.utf8=153 path.count=125 fileName=[漫漫長夜翻譯組] [よのき] 鬼畜英雄_EP106_P6.png fileName.utf8=61 fileName.count=33
2026-05-05 07:28:33 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 07:28:33 +0000 [SaveFileDialog.swift:15 deinit]
2026-05-05 07:28:33 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png sourceFilePath.utf8=267 fileName=nil fileName.utf8=0 dataBytes=0
2026-05-05 07:28:33 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png path.utf8=273 path.count=165 fileName=轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png fileName.utf8=181 fileName.count=73
2026-05-05 07:28:33 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png path.utf8=273 path.count=165 fileName=轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png fileName.utf8=181 fileName.count=73
2026-05-05 14:28:42 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 14:28:42 +0000 [SaveFileDialog.swift:15 deinit]
2026-05-05 14:28:42 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/3E03D305-2716-41AB-B7CA-2D4F4CCD8518/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png sourceFilePath.utf8=434 fileName=nil fileName.utf8=0 dataBytes=0
2026-05-05 14:28:42 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/3E03D305-2716-41AB-B7CA-2D4F4CCD8518/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=455 path.count=222 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 14:28:42 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/var/mobile/Containers/Data/Application/3E03D305-2716-41AB-B7CA-2D4F4CCD8518/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=455 path.count=222 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130

2026-05-05 07:27:27 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 07:27:27 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png sourceFilePath.utf8=267 fileName=轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png fileName.utf8=175 dataBytes=0
2026-05-05 07:27:27 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png path.utf8=273 path.count=165 fileName=轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png fileName.utf8=181 fileName.count=73
2026-05-05 07:27:27 +0000 [SaveFileDialog.swift:134 saveFile(_:result:)] tempFileUrl path=/private/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/tmp/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png path.utf8=270 path.count=162 fileName=轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png fileName.utf8=181 fileName.count=73
2026-05-05 07:27:27 +0000 [SaveFileDialog.swift:147 saveFile(_:result:)] Copying file:///var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/%E8%BD%89%E7%94%9F%E5%A5%B4%E9%9A%B8%E8%A7%92%E9%AC%A5%E5%A0%B4%20%5Bzunta%20%E3%81%AF%E3%82%89%E3%82%8F%E3%81%9F%E3%81%95%E3%81%84%E3%81%9D%E3%82%99%E3%81%86%5D%20%E8%BD%89%E7%94%9F%E3%82%B3%E3%83%AD%E3%82%B7%E3%82%A2%E3%83%A0%EF%BD%9E%E6%9C%80%E5%BC%B1%E3%82%B9%E3%82%AD%E3%83%AB%E3%81%A6%E3%82%99%E6%9C%80%E5%BC%B7%E3%81%AE%E5%A5%B3%E3%81%9F%E3%81%A1%E3%82%92%E6%94%BB%E7%95%A5%E3%81%97%E3%81%A6%E5%A5%B4%E9%9A%B7%E3%83%8F%E3%83%BC%E3%83%AC%E3%83%A0%E4%BD%9C%E3%82%8A%E3%81%BE%E3%81%99%EF%BD%9E_EP23_P1.png to file:///private/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/tmp/%E8%BD%89%E7%94%9F%E5%A5%B4%E9%9A%B8%E8%A7%92%E9%AC%A5%E5%A0%B4%20%5Bzunta%20%E3%81%AF%E3%82%89%E3%82%8F%E3%81%9F%E3%81%95%E3%81%84%E3%81%9D%E3%82%99%E3%81%86%5D%20%E8%BD%89%E7%94%9F%E3%82%B3%E3%83%AD%E3%82%B7%E3%82%A2%E3%83%A0%EF%BD%9E%E6%9C%80%E5%BC%B1%E3%82%B9%E3%82%AD%E3%83%AB%E3%81%A6%E3%82%99%E6%9C%80%E5%BC%B7%E3%81%AE%E5%A5%B3%E3%81%9F%E3%81%A1%E3%82%92%E6%94%BB%E7%95%A5%E3%81%97%E3%81%A6%E5%A5%B4%E9%9A%B7%E3%83%8F%E3%83%BC%E3%83%AC%E3%83%A0%E4%BD%9C%E3%82%8A%E3%81%BE%E3%81%99%EF%BD%9E_EP23_P1.png
2026-05-05 07:27:27 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/private/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/tmp/轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png path.utf8=270 path.count=162 fileName=轉生奴隸角鬥場 [zunta はらわたさいぞう] 轉生コロシアム～最弱スキルで最強の女たちを攻略して奴隷ハーレム作ります～_EP23_P1.png fileName.utf8=181 fileName.count=73
2026-05-05 14:34:01 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 14:34:01 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/729E2F1F-8B47-4C11-9309-8D4092A90588/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png sourceFilePath.utf8=434 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=342 dataBytes=0
2026-05-05 14:34:01 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/729E2F1F-8B47-4C11-9309-8D4092A90588/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=455 path.count=222 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 14:34:01 +0000 [SaveFileDialog.swift:134 saveFile(_:result:)] tempFileUrl path=/private/var/mobile/Containers/Data/Application/729E2F1F-8B47-4C11-9309-8D4092A90588/tmp/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=452 path.count=219 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 14:34:01 +0000 [SaveFileDialog.swift:147 saveFile(_:result:)] Copying file:///var/mobile/Containers/Data/Application/729E2F1F-8B47-4C11-9309-8D4092A90588/Library/Caches/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png to file:///private/var/mobile/Containers/Data/Application/729E2F1F-8B47-4C11-9309-8D4092A90588/tmp/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png
2026-05-05 14:34:01 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/private/var/mobile/Containers/Data/Application/729E2F1F-8B47-4C11-9309-8D4092A90588/tmp/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=452 path.count=219 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130

2026-05-05 14:52:28 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 14:52:28 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png sourceFilePath.utf8=434 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=342 dataBytes=0
2026-05-05 14:52:28 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=455 path.count=222 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 14:52:28 +0000 [SaveFileDialog.swift:134 saveFile(_:result:)] tempFileUrl path=/private/var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/tmp/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=452 path.count=219 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 14:52:28 +0000 [SaveFileDialog.swift:147 saveFile(_:result:)] Copying file:///var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/Library/Caches/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png to file:///private/var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/tmp/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png
2026-05-05 14:52:28 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/private/var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/tmp/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=452 path.count=219 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
flutter: Data uploaded successfully
2026-05-05 14:52:33 +0000 [SaveFileDialog.swift:203 documentPicker(_:didPickDocumentsAt:)] didPickDocumentsAt
2026-05-05 14:52:33 +0000 [SaveFileDialog.swift:184 deleteTempFile()] Deleting temp file file:///private/var/mobile/Containers/Data/Application/937B0DC2-646D-478D-A881-E4CBF25A9990/tmp/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png

2026-05-05 07:41:50 +0000 [SwiftFlutterFileDialogPlugin.swift:24 handle(_:result:)] saveFile
2026-05-05 07:41:50 +0000 [SaveFileDialog.swift:15 deinit]
2026-05-05 07:41:50 +0000 [SaveFileDialog.swift:102 saveFile(_:result:)] saveFile params sourceFilePath=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png sourceFilePath.utf8=434 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=342 dataBytes=0
2026-05-05 07:41:50 +0000 [SaveFileDialog.swift:118 saveFile(_:result:)] sourceFileUrl path=/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=455 path.count=222 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 07:41:50 +0000 [SaveFileDialog.swift:134 saveFile(_:result:)] tempFileUrl path=/private/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/tmp/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=452 path.count=219 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
2026-05-05 07:41:50 +0000 [SaveFileDialog.swift:147 saveFile(_:result:)] Copying file:///var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/Library/Caches/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png to file:///private/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/tmp/%E8%88%87%E6%98%8E%E6%98%8E%E7%9C%8B%E8%B5%B7%E4%BE%86%E5%BE%88%E6%B8%85%E7%B4%94%E5%8D%BB%E7%94%A8%E4%B8%8B%E6%B5%81%E7%9A%84%E8%A8%80%E8%BE%AD%E5%91%BB%E5%90%9F%E8%B5%B7%E4%BE%86%E7%9A%84%E9%84%B0%E5%AE%B6%E5%B7%A8%E4%B9%B3%E5%A4%A7%E5%A7%90%E5%A7%90%E6%BF%83%E5%8E%9A%E8%A6%AA%E5%AF%86%E6%81%A9%E6%84%9B%E6%80%A7%E6%84%9B%E7%9A%84%E6%95%85%E4%BA%8B%20%5B%E3%81%B2%E3%81%A4%E3%81%97%E3%82%99%E3%81%AE%E3%81%86%E3%81%A8%E3%82%99%E3%82%93%E5%B1%8B%20(%E3%81%84%E3%81%AA%E3%81%BF%E3%81%BF)%5D%20%E6%B8%85%E6%A5%9A%E3%81%A3%E3%81%BB%E3%82%9A%E3%81%84%E3%81%AE%E3%81%AB%E4%B8%8B%E5%93%81%E3%81%AA%E8%A8%80%E8%91%89%E3%81%A4%E3%82%99%E3%81%8B%E3%81%84%E3%81%A6%E3%82%99%E3%82%AA%E3%83%9B%E5%96%98%E3%81%8D%E3%82%99%E3%81%97%E3%81%A1%E3%82%83%E3%81%86%E8%BF%91%E6%89%80%E3%81%AE%E5%B7%A8%E4%B9%B3%E3%81%8A%E5%A7%89%E3%81%95%E3%82%93%E3%81%A8%E6%BF%83%E5%8E%9A%E3%81%84%E3%81%A1%E3%82%83%E3%83%A9%E3%83%95%E3%82%99%E3%81%88%E3%81%A3%E3%81%A1%E3%81%99%E3%82%8B%E8%A9%B1%20%5B%E4%B8%AD%E5%9C%8B%E7%BF%BB%E8%AD%AF%5D%20%5B%E7%A6%81%E6%BC%AB%E5%8E%BB%E7%A2%BC%5D_EP1_P1.png
2026-05-05 07:41:50 +0000 [SaveFileDialog.swift:161 saveFile(_:result:)] documentPickerExportUrl path=/private/var/mobile/Containers/Data/Application/BB25DC58-B23C-40E7-A7A2-1C76278E5572/tmp/與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png path.utf8=452 path.count=219 fileName=與明明看起來很清純卻用下流的言辭呻吟起來的鄰家巨乳大姐姐濃厚親密恩愛性愛的故事 [ひつじのうどん屋 (いなみみ)] 清楚っぽいのに下品な言葉づかいでオホ喘ぎしちゃう近所の巨乳お姉さんと濃厚いちゃラブえっちする話 [中國翻譯] [禁漫去碼]_EP1_P1.png fileName.utf8=363 fileName.count=130
```

依然什么都看不出来，只能看出来多走了一个 TMP 转换，然后 iOS 的问题就可以解决，我服了，完全不知道为什么 iOS 的文件无法显示。

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/20260505230857427.webp)

没招了，至少把这个问题修了，最终提了 PR：

https://github.com/haukuen/venera/pull/46

