---
title: "BUILD A CHM FILE"
date: 2021-08-08T22:43:00+08:00
tags:
- Tools
---

CHM? Yeah have a long history...

> In 2002, Microsoft announced some security risks associated with the .CHM format, as well as some security bulletins and patches. They have since announced their intentions not to develop the .CHM format further, and will be moving to a new generation of Windows Help called Microsoft Assistance Markup Language in the Windows Vista operating system.
>
> --[Wikipedia](https://en.wikipedia.org/wiki/Microsoft_Compiled_HTML_Help)

I try to  use command under ubuntu build `chm` file about python, without GUI software help, which sounds cool. But something during Microsoft and Open Source happend, which made the solution is old and complex, but fortunately its not difficult.

Then I found out the way in [StackoverFlow](https://stackoverflow.com/questions/9174140/html-to-chm-file-under-linux), and I got they seem not interested in this file supporting acrosso-platform and friendly to phone device(file manage and photo...). I found awesome [website](https://command-not-found.com/) for giving help to *nix command which not found . The `fpc` included `chmcmd` we need, but it occupied over `675 MB` ,,, I am hesitated, so I give up, ahhhhhh.....

let's do it in windows by HugeChm made by [strnghrs](https://www.cnblogs.com/stronghorse/) with size under `140kb`! Sounds increditable, and he give two share link, like [share1-4hie](https://pan.baidu.com/s/1PnpZ3Bk-lTArrajva7EVzQ) & [share2](https://www.mediafire.com/folder/f0z2hexqdnr9a/Software). Wish it helps you. Also that's not open source. So you only could get it from above two links. No mood to do... And also in building content and language showed had some bug, such as no contents, index, bookmark and can't search anything... SO like its title, which just suits for huge file needed to package.

I also see the documents in [Microsoft](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/htmlhelp/creating-help). But it seemed not say anything, just like bullshit...

[EasyCHM](http://www.etextwizard.com/easychm.html) is a paid software, [sold](http://www.etextwizard.com/order_easychm.html) `$259` for home and `$359` for business... Expensive....but that works. Thank God...

Maybe using `PDF` insteaded `chm` is a better choose? And [`chmlib`](https://github.com/jedwing/CHMLib) will help you a lot in spliting `CHM`.

