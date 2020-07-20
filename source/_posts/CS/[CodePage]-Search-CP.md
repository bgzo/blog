---
title: '[CodePage] Search CP'
toc: true
date: 2020-07-03 23:30:00:00
---

## Preface 

Today I was trouble in the CP problem within a whole Afternoon in that java GUI/language output only support the sys language(GBK), meanwhile Window Family Version isn't support the English-System , Oh only damn it ! So I catch some Code Page to switch.

[Ori] : https://en.wikipedia.org/wiki/Code_page

> In [computing](https://en.wikipedia.org/wiki/Computing), a **code page** is a [character encoding](https://en.wikipedia.org/wiki/Character_encoding) and as such it is a specific association of a set of printable [characters](https://en.wikipedia.org/wiki/Character_(computing)) and [control characters](https://en.wikipedia.org/wiki/Control_character) with unique numbers.
>
> The term "code page" originated from [IBM](https://en.wikipedia.org/wiki/IBM)'s [EBCDIC](https://en.wikipedia.org/wiki/EBCDIC)-based mainframe systems, but [Microsoft](https://en.wikipedia.org/wiki/Microsoft), [SAP](https://en.wikipedia.org/wiki/SAP_AG), and [Oracle Corporation](https://en.wikipedia.org/wiki/Oracle_Corporation)are among the few vendors which use this term. The majority of vendors identify their own character sets by a name. In the case when there is a plethora of character sets (like in IBM), identifying character sets through a number is a convenient way to distinguish them. Originally, the code page numbers referred to the [*page* numbers](https://en.wikipedia.org/wiki/Page_number) in the IBM standard character set manual,a condition which has not held for a long time. Vendors that use a code page system allocate their own code page number to a character encoding, even if it is better known by another name; for example, [UTF-8](https://en.wikipedia.org/wiki/UTF-8) has been assigned page numbers 1208 at IBM, 65001 at Microsoft, and 4110 at SAP.
>
> [Hewlett-Packard](https://en.wikipedia.org/wiki/Hewlett-Packard) uses a similar concept in its [HP-UX](https://en.wikipedia.org/wiki/HP-UX) operating system and its [Printer Command Language](https://en.wikipedia.org/wiki/Printer_Command_Language)(PCL) protocol for printers (either for HP printers or not). The terminology, however, is different: What others call a *character set*, HP calls a *symbol set*, and what IBM or Microsoft call a *code page*, HP calls a *symbol set code*. HP developed a series of symbol sets, each with an associated symbol set code, to encode both its own character sets and other vendors’ character sets.
>
> The multitude of character sets leads many vendors to recommend [Unicode](https://en.wikipedia.org/wiki/Unicode).
>
> IBM introduced the concept of systematically assigning a small, but globally unique, 16 bit number to each character encoding that a computer system or collection of computer systems might encounter. The IBM origin of the numbering scheme is reflected in the fact that the smallest (first) numbers are assigned to variations of IBM's EBCDIC encoding and slightly larger numbers refer to variations of IBM's [extended ASCII](https://en.wikipedia.org/wiki/Extended_ASCII) encoding as used in its PC hardware.
>
> With the release of [PC DOS](https://en.wikipedia.org/wiki/PC_DOS) version 3.3 (and the near identical [MS-DOS](https://en.wikipedia.org/wiki/MS-DOS) 3.3) IBM introduced the code page numbering system to regular PC users, as the code page numbers (and the phrase "code page") were used in new commands to allow the character encoding used by all parts of the OS to be set in a systematic way.
>
> After IBM and Microsoft ceased to cooperate in the 1990s, the two companies have maintained the list of assigned code page numbers independently from each other, resulting in some conflicting assignments. At least one third-party vendor ([Oracle](https://en.wikipedia.org/wiki/Oracle_Corporation)) also has its own different list of numeric assignments.[[3\]](https://en.wikipedia.org/wiki/Code_page#cite_note-oracle.com-3) IBM's current assignments are listed in their [CCSID](https://en.wikipedia.org/wiki/CCSID) repository, while Microsoft's assignments are documented within the [MSDN](https://en.wikipedia.org/wiki/MSDN).Additionally, a list of the names and approximate IANA ([Internet Assigned Numbers Authority](https://en.wikipedia.org/wiki/Internet_Assigned_Numbers_Authority)) abbreviations for the installed code pages on any given Windows machine can be found in the Registry on that machine (this information is used by Microsoft programs such as [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer)).
>
> Most well-known code pages, excluding those for the [CJK](https://en.wikipedia.org/wiki/CJK) languages and [Vietnamese](https://en.wikipedia.org/wiki/Vietnamese_language), fit all their code-points into eight bits and do not involve anything more than mapping each code-point to a single character; furthermore, techniques such as combining characters, complex scripts, etc., are not involved.
>
> The text mode of standard ([VGA-compatible](https://en.wikipedia.org/wiki/VGA-compatible_text_mode)) PC graphics hardware is built around using an 8-bit code page, though it is possible to use two at once with some color depth sacrifice, and up to eight may be stored in the display adaptor for easy switching. There was a selection of third-party code page fonts that could be loaded into such hardware. However, it is now commonplace for operating system vendors to provide their own character encoding and rendering systems that run in a graphics mode and bypass this hardware limitation entirely. However the system of referring to character encodings by a code page number remains applicable, as an efficient alternative to string identifiers such as those specified by the IETF and IANA for use in various protocols such as e-mail and web pages.
>
> ### Relationship to ASCII
>
> The majority of code pages in current use are supersets of [ASCII](https://en.wikipedia.org/wiki/ASCII), a 7-bit code representing 128 control codes and printable characters. In the distant past, 8-bit implementations of the ASCII code set the top bit to zero or used it as a [parity bit](https://en.wikipedia.org/wiki/Parity_bit) in network data transmissions. When the top bit was made available for representing character data, a total of 256 characters and control codes could be represented. Most vendors (including IBM) used this extended range to encode characters used by various languages and graphical elements that allowed the imitation of primitive graphics on text-only output devices. No formal standard existed for these ‘extended ASCII character sets’ and vendors referred to the variants as code pages, as IBM had always done for variants of EBCDIC encodings.
>
> ### Relationship to Unicode
>
> Unicode is an effort to include all characters from all currently and historically used human languages into single character enumeration (effectively one large single code page), removing the need to distinguish between different code pages when handling digitally stored text. Unicode tries to retain backwards compatibility with many legacy code pages, copying some code pages 1:1 in the design process. An explicit design goal of Unicode was to allow round-trip conversion between all common legacy code pages, although this goal has not always been achieved. Some vendors, namely IBM and Microsoft, have anachronistically assigned code page numbers to Unicode encodings. This convention allows code page numbers to be used as metadata to identify the correct decoding algorithm when encountering binary stored data.



## IBM code pages

### EBCDIC-based code pages

These code pages are used by IBM in its EBCDIC character sets for [mainframe computers](https://en.wikipedia.org/wiki/IBM_mainframe).

- [1](https://en.wikipedia.org/wiki/Code_page_1) – USA WP, Original
- [2](https://en.wikipedia.org/wiki/Code_page_2) – USA
- [3](https://en.wikipedia.org/wiki/Code_page_3) – USA Accounting, Version A
- [4](https://en.wikipedia.org/wiki/Code_page_4) – USA
- [5](https://en.wikipedia.org/wiki/Code_page_5) – USA
- [6](https://en.wikipedia.org/wiki/Code_page_6) – Latin America
- [7](https://en.wikipedia.org/wiki/Code_page_7) – Germany F.R. / Austria
- [8](https://en.wikipedia.org/wiki/Code_page_8) – Germany F.R.
- [9](https://en.wikipedia.org/wiki/Code_page_9) – France, Belgium
- [10](https://en.wikipedia.org/wiki/Code_page_10) – Canada (English)
- [11](https://en.wikipedia.org/wiki/Code_page_11) – Canada (French)
- [12](https://en.wikipedia.org/wiki/Code_page_12) – Italy
- [13](https://en.wikipedia.org/wiki/Code_page_13) – Netherlands
- [14](https://en.wikipedia.org/w/index.php?title=Code_page_14&action=edit&redlink=1) –
- [15](https://en.wikipedia.org/wiki/Code_page_15) – Switzerland (French)
- [16](https://en.wikipedia.org/wiki/Code_page_16) – Switzerland (French / German)
- [17](https://en.wikipedia.org/wiki/Code_page_17) – Switzerland (German)
- [18](https://en.wikipedia.org/wiki/Code_page_18) – Sweden / Finland
- [19](https://en.wikipedia.org/wiki/Code_page_19) – Sweden / Finland WP, version 2
- [20](https://en.wikipedia.org/wiki/Code_page_20) – Denmark/Norway
- [21](https://en.wikipedia.org/wiki/Code_page_21) – Brazil
- [22](https://en.wikipedia.org/wiki/Code_page_22) – Portugal
- [23](https://en.wikipedia.org/wiki/Code_page_23) – United Kingdom
- [24](https://en.wikipedia.org/wiki/Code_page_24) – United Kingdom
- [25](https://en.wikipedia.org/wiki/Code_page_25) – Japan (Latin)
- [26](https://en.wikipedia.org/wiki/Code_page_26) – Japan (Latin)
- [27](https://en.wikipedia.org/wiki/Code_page_27) – Greece (Latin)
- [28](https://en.wikipedia.org/w/index.php?title=Code_page_28&action=edit&redlink=1) –
- [29](https://en.wikipedia.org/wiki/Code_page_29) – Iceland
- [30](https://en.wikipedia.org/wiki/Code_page_30) – Turkey
- [31](https://en.wikipedia.org/wiki/Code_page_31) – South Africa
- [32](https://en.wikipedia.org/wiki/Code_page_32) – Czechoslovakia (Czech / Slovak)
- [33](https://en.wikipedia.org/wiki/Code_page_33) – Czechoslovakia
- [34](https://en.wikipedia.org/wiki/Code_page_34) – Czechoslovakia
- [35](https://en.wikipedia.org/wiki/Code_page_35) – Romania
- [36](https://en.wikipedia.org/wiki/Code_page_36) – Romania
- [37](https://en.wikipedia.org/wiki/Code_page_37) – USA/Canada - CECP (same with euro: [1140](https://en.wikipedia.org/wiki/Code_page_1140))
- [37-2](https://en.wikipedia.org/wiki/EBCDIC_037-2) – The real 3279 APL codepage, as used by C/370. This is very close to 1047, except for caret and not-sign inverted. It is not officially recognized by IBM, even though SHARE has pointed out its existence.
- [38](https://en.wikipedia.org/wiki/Code_page_38) – USA ASCII
- [39](https://en.wikipedia.org/wiki/Code_page_39) – United Kingdom / Israel
- [40](https://en.wikipedia.org/wiki/Code_page_40) – United Kingdom
- [251](https://en.wikipedia.org/wiki/Code_page_251) – China
- [252](https://en.wikipedia.org/wiki/Code_page_252) – Poland
- [254](https://en.wikipedia.org/wiki/Code_page_254) – Hungary
- [256](https://en.wikipedia.org/wiki/Code_page_256) – International #1 (superseded by [500](https://en.wikipedia.org/wiki/Code_page_500))
- [257](https://en.wikipedia.org/wiki/Code_page_257) – International #2
- [258](https://en.wikipedia.org/wiki/Code_page_258) – International #3
- [259](https://en.wikipedia.org/wiki/Code_page_259) – Symbols, Set 7
- [260](https://en.wikipedia.org/wiki/Code_page_260) – Canadian French - 116
- [264](https://en.wikipedia.org/wiki/Code_page_264) – Print Train & Text processing extended
- [273](https://en.wikipedia.org/wiki/Code_page_273) – Germany F.R./Austria - CECP (same with euro: [1141](https://en.wikipedia.org/wiki/Code_page_1141))
- [274](https://en.wikipedia.org/wiki/Code_page_274) – Old Belgium Code Page
- [275](https://en.wikipedia.org/wiki/Code_page_275) – Brazil - CECP
- [276](https://en.wikipedia.org/wiki/Code_page_276) – Canada (French) - 94
- [277](https://en.wikipedia.org/wiki/Code_page_277) – Denmark, Norway - CECP (same with euro: [1142](https://en.wikipedia.org/wiki/Code_page_1142))
- [278](https://en.wikipedia.org/wiki/Code_page_278) – Finland, Sweden - CECP (same with euro: [1143](https://en.wikipedia.org/wiki/Code_page_1143))
- [279](https://en.wikipedia.org/wiki/Code_page_279) – French - 94
- [280](https://en.wikipedia.org/wiki/Code_page_280) – Italy - CECP (same with euro: [1144](https://en.wikipedia.org/wiki/Code_page_1144))
- [281](https://en.wikipedia.org/wiki/Code_page_281) – Japan (Latin) - CECP
- [282](https://en.wikipedia.org/wiki/Code_page_282) – Portugal - CECP
- [283](https://en.wikipedia.org/wiki/Code_page_283) – Spain - 190
- [284](https://en.wikipedia.org/wiki/Code_page_284) – Spain/Latin America - CECP (same with euro: [1145](https://en.wikipedia.org/wiki/Code_page_1145))
- [285](https://en.wikipedia.org/wiki/Code_page_285) – United Kingdom - CECP (same with euro: [1146](https://en.wikipedia.org/wiki/Code_page_1146))
- [286](https://en.wikipedia.org/wiki/Code_page_286) – Austria / Germany F.R. Alternate
- [287](https://en.wikipedia.org/wiki/Code_page_287) – Denmark / Norway Alternate
- [288](https://en.wikipedia.org/wiki/Code_page_288) – Finland / Sweden Alternate
- [289](https://en.wikipedia.org/wiki/Code_page_289) – Spain Alternate
- [290](https://en.wikipedia.org/wiki/Code_page_290) – Japanese (Katakana) Extended
- [293](https://en.wikipedia.org/wiki/Code_page_293) – APL
- [297](https://en.wikipedia.org/wiki/Code_page_297) – France (same with euro: [1147](https://en.wikipedia.org/wiki/Code_page_1147))
- [298](https://en.wikipedia.org/wiki/Code_page_298) – Japan (Katakana)
- [300](https://en.wikipedia.org/wiki/Code_page_300) – Japan (Kanji) DBCS (For JIS X 0213)
- [310](https://en.wikipedia.org/wiki/Code_page_310) – Graphic Escape APL/TN
- [320](https://en.wikipedia.org/wiki/Code_page_320) – Hungary
- [321](https://en.wikipedia.org/wiki/Code_page_321) – Yugoslavia
- [322](https://en.wikipedia.org/wiki/Code_page_322) – Turkey
- [330](https://en.wikipedia.org/wiki/Code_page_330) – International #4
- [351](https://en.wikipedia.org/wiki/Code_page_351) – GDDM default
- [352](https://en.wikipedia.org/wiki/Code_page_352) – Printing and publishing option
- [353](https://en.wikipedia.org/wiki/Code_page_353) – BCDIC-A
- [355](https://en.wikipedia.org/wiki/Code_page_355) – PTTC/BCD standard option
- [357](https://en.wikipedia.org/wiki/Code_page_357) – PTTC/BCD H option
- [358](https://en.wikipedia.org/wiki/Code_page_358) – PTTC/BCD Correspondence option
- [359](https://en.wikipedia.org/wiki/Code_page_359) – PTTC/BCD Monocase option
- [360](https://en.wikipedia.org/wiki/Code_page_360) – PTTC/BCD Duocase option
- [361](https://en.wikipedia.org/wiki/Code_page_361) – EBCDIC Publishing International
- [363](https://en.wikipedia.org/wiki/Code_page_363) – Symbols, set 8
- [382](https://en.wikipedia.org/wiki/Code_page_382) – EBCDIC Publishing Austria, Germany F.R. Alternate
- [383](https://en.wikipedia.org/wiki/Code_page_383) – EBCDIC Publishing Belgium
- [384](https://en.wikipedia.org/wiki/Code_page_384) – EBCDIC Publishing Brazil
- [385](https://en.wikipedia.org/wiki/Code_page_385) – EBCDIC Publishing Canada (French)
- [386](https://en.wikipedia.org/wiki/Code_page_386) – EBCDIC Publishing Denmark, Norway
- [387](https://en.wikipedia.org/wiki/Code_page_387) – EBCDIC Publishing Finland, Sweden
- [388](https://en.wikipedia.org/wiki/Code_page_388) – EBCDIC Publishing France
- [389](https://en.wikipedia.org/wiki/Code_page_389) – EBCDIC Publishing Italy
- [390](https://en.wikipedia.org/w/index.php?title=Code_page_390&action=edit&redlink=1) – EBCDIC Publishing Japan (Latin)
- [391](https://en.wikipedia.org/w/index.php?title=Code_page_391&action=edit&redlink=1) – EBCDIC Publishing Portugal
- [392](https://en.wikipedia.org/w/index.php?title=Code_page_392&action=edit&redlink=1) – EBCDIC Publishing Spain, Philippines
- [393](https://en.wikipedia.org/w/index.php?title=Code_page_393&action=edit&redlink=1) – EBCDIC Publishing Latin America (Spanish Speaking)
- [394](https://en.wikipedia.org/w/index.php?title=Code_page_394&action=edit&redlink=1) – EBCDIC Publishing China (Hong Kong), UK, Ireland
- [395](https://en.wikipedia.org/w/index.php?title=Code_page_395&action=edit&redlink=1) – EBCDIC Publishing Australia, New Zealand, USA, Canada (English)
- [410](https://en.wikipedia.org/wiki/Code_page_410) – Cyrillic (revisions: [880](https://en.wikipedia.org/wiki/Code_page_880), [1025](https://en.wikipedia.org/wiki/Code_page_1025), [1154](https://en.wikipedia.org/wiki/Code_page_1154))
- [420](https://en.wikipedia.org/wiki/Code_page_420) – Arabic
- [421](https://en.wikipedia.org/wiki/Code_page_421) – Maghreb/French
- [423](https://en.wikipedia.org/wiki/Code_page_423) – Greek (superseded by [875](https://en.wikipedia.org/wiki/Code_page_875))
- [424](https://en.wikipedia.org/wiki/Code_page_424) – Hebrew (Bulletin Code)
- [425](https://en.wikipedia.org/wiki/Code_page_425) – Arabic / Latin for OS/390 Open Edition
- [435](https://en.wikipedia.org/w/index.php?title=Code_page_435&action=edit&redlink=1) – Teletext Isomorphic
- [500](https://en.wikipedia.org/wiki/Code_page_500) – International #5 (ECECP; supersedes [256](https://en.wikipedia.org/wiki/Code_page_256)) (same with euro: [1148](https://en.wikipedia.org/wiki/Code_page_1148))
- [803](https://en.wikipedia.org/wiki/Code_page_803) – Hebrew Character Set A (Old Code)
- [829](https://en.wikipedia.org/w/index.php?title=Code_page_829&action=edit&redlink=1) – Host Math Symbols- Publishing
- [833](https://en.wikipedia.org/wiki/Code_page_833) – Korean Extended (SBCS)
- [834](https://en.wikipedia.org/w/index.php?title=Code_page_834&action=edit&redlink=1) – Korean Hangul (KSC5601; DBCS with UDCs)
- [835](https://en.wikipedia.org/w/index.php?title=Code_page_835&action=edit&redlink=1) – Traditional Chinese DBCS
- [836](https://en.wikipedia.org/wiki/Code_page_836) – Simplified Chinese Extended
- [837](https://en.wikipedia.org/w/index.php?title=Code_page_837&action=edit&redlink=1) – Simplified Chinese DBCS
- [838](https://en.wikipedia.org/wiki/Code_page_838) – Thai with Low Marks & Accented Characters (same with euro: [1160](https://en.wikipedia.org/wiki/Code_page_1160))
- [839](https://en.wikipedia.org/w/index.php?title=Code_page_839&action=edit&redlink=1) – Thai DBCS
- [870](https://en.wikipedia.org/wiki/Code_page_870) – Latin 2 (same with euro: [1153](https://en.wikipedia.org/wiki/Code_page_1153)) (revision: [1110](https://en.wikipedia.org/wiki/Code_page_1110))
- [871](https://en.wikipedia.org/wiki/Code_page_871) – Iceland (same with euro: [1149](https://en.wikipedia.org/wiki/Code_page_1149))
- [875](https://en.wikipedia.org/wiki/Code_page_875) – Greek (supersedes [423](https://en.wikipedia.org/wiki/Code_page_423))
- [880](https://en.wikipedia.org/wiki/Code_page_880) – Cyrillic (revision of [410](https://en.wikipedia.org/wiki/Code_page_410)) (revisions: [1025](https://en.wikipedia.org/wiki/Code_page_1025), [1154](https://en.wikipedia.org/wiki/Code_page_1154))
- [881](https://en.wikipedia.org/w/index.php?title=Code_page_881&action=edit&redlink=1) – United States - 5080 Graphics System
- [882](https://en.wikipedia.org/w/index.php?title=Code_page_882&action=edit&redlink=1) – United Kingdom - 5080 Graphics System
- [883](https://en.wikipedia.org/w/index.php?title=Code_page_883&action=edit&redlink=1) – Sweden - 5080 Graphics System
- [884](https://en.wikipedia.org/w/index.php?title=Code_page_884&action=edit&redlink=1) – Germany - 5080 Graphics System
- [885](https://en.wikipedia.org/w/index.php?title=Code_page_885&action=edit&redlink=1) – France - 5080 Graphics System
- [886](https://en.wikipedia.org/w/index.php?title=Code_page_886&action=edit&redlink=1) – Italy - 5080 Graphics System
- [887](https://en.wikipedia.org/w/index.php?title=Code_page_887&action=edit&redlink=1) – Japan - 5080 Graphics System
- [888](https://en.wikipedia.org/w/index.php?title=Code_page_888&action=edit&redlink=1) – France AZERTY - 5080 Graphics System
- [889](https://en.wikipedia.org/w/index.php?title=Code_page_889&action=edit&redlink=1) – Thailand
- [890](https://en.wikipedia.org/w/index.php?title=Code_page_890&action=edit&redlink=1) – Yugoslavia
- [892](https://en.wikipedia.org/wiki/Code_page_892) – EBCDIC, OCR A
- [893](https://en.wikipedia.org/wiki/Code_page_893) – EBCDIC, OCR B
- [905](https://en.wikipedia.org/wiki/Code_page_905) – Latin 3
- [918](https://en.wikipedia.org/wiki/Code_page_918) – Urdu Bilingual
- [924](https://en.wikipedia.org/wiki/Code_page_924) – Latin 9
- [930](https://en.wikipedia.org/wiki/Code_page_930) – Japan MIX ([290](https://en.wikipedia.org/wiki/Code_page_290) + [300](https://en.wikipedia.org/wiki/Code_page_300)) (same with euro: [1390](https://en.wikipedia.org/wiki/Code_page_1390))
- [931](https://en.wikipedia.org/w/index.php?title=Code_page_931&action=edit&redlink=1) – Japan MIX ([37](https://en.wikipedia.org/wiki/Code_page_37) + [300](https://en.wikipedia.org/wiki/Code_page_300))
- [933](https://en.wikipedia.org/w/index.php?title=Code_page_933&action=edit&redlink=1) – Korea MIX ([833](https://en.wikipedia.org/wiki/Code_page_833) + [834](https://en.wikipedia.org/w/index.php?title=Code_page_834&action=edit&redlink=1)) (same with euro: [1364](https://en.wikipedia.org/w/index.php?title=Code_page_1364&action=edit&redlink=1))
- [935](https://en.wikipedia.org/w/index.php?title=Code_page_935&action=edit&redlink=1) – Simplified Chinese MIX ([836](https://en.wikipedia.org/wiki/Code_page_836) + [837](https://en.wikipedia.org/w/index.php?title=Code_page_837&action=edit&redlink=1)) (same with euro: [1388](https://en.wikipedia.org/w/index.php?title=Code_page_1388&action=edit&redlink=1))
- [937](https://en.wikipedia.org/w/index.php?title=Code_page_937&action=edit&redlink=1) – Traditional Chinese MIX ([37](https://en.wikipedia.org/wiki/Code_page_37) + [835](https://en.wikipedia.org/w/index.php?title=Code_page_835&action=edit&redlink=1)) (same with euro: [1371](https://en.wikipedia.org/w/index.php?title=Code_page_1371&action=edit&redlink=1))
- [939](https://en.wikipedia.org/w/index.php?title=Code_page_939&action=edit&redlink=1) – Japan MIX ([1027](https://en.wikipedia.org/wiki/Code_page_1027) + [300](https://en.wikipedia.org/wiki/Code_page_300)) (same with euro: [1399](https://en.wikipedia.org/w/index.php?title=Code_page_1399&action=edit&redlink=1))
- [1001](https://en.wikipedia.org/w/index.php?title=Code_page_1001&action=edit&redlink=1) – MICR
- [1002](https://en.wikipedia.org/wiki/Code_page_1002) – EBCDIC DCF Release 2 Compatibility
- [1003](https://en.wikipedia.org/w/index.php?title=Code_page_1003&action=edit&redlink=1) – EBCDIC DCF, US Text subset
- [1005](https://en.wikipedia.org/w/index.php?title=Code_page_1005&action=edit&redlink=1) – EBCDIC Isomorphic Text Communication
- [1007](https://en.wikipedia.org/w/index.php?title=Code_page_1007&action=edit&redlink=1) – EBCDIC Arabic (XCOM2)
- [1024](https://en.wikipedia.org/w/index.php?title=Code_page_1024&action=edit&redlink=1) – EBCDIC T.61
- [1025](https://en.wikipedia.org/wiki/Code_page_1025) – Cyrillic, Multilingual (same with euro: [1154](https://en.wikipedia.org/wiki/Code_page_1154)) (Revision of [880](https://en.wikipedia.org/wiki/Code_page_880))
- [1026](https://en.wikipedia.org/wiki/Code_page_1026) – EBCDIC Turkey (Latin 5) (same with euro: [1155](https://en.wikipedia.org/wiki/Code_page_1154)) (supersedes [905](https://en.wikipedia.org/wiki/Code_page_905) in that country)
- [1027](https://en.wikipedia.org/wiki/Code_page_1027) – Japanese (Latin) Extended (JIS X 0201 Extended)
- [1028](https://en.wikipedia.org/w/index.php?title=Code_page_1028&action=edit&redlink=1) – EBCDIC Publishing Hebrew
- [1030](https://en.wikipedia.org/w/index.php?title=Code_page_1030&action=edit&redlink=1) – Japanese (Katakana) Extended
- [1031](https://en.wikipedia.org/w/index.php?title=Code_page_1031&action=edit&redlink=1) – Japanese (Latin) Extended
- [1032](https://en.wikipedia.org/w/index.php?title=Code_page_1032&action=edit&redlink=1) – MICR, E13-B Combined
- [1033](https://en.wikipedia.org/w/index.php?title=Code_page_1033&action=edit&redlink=1) – MICR, CMC-7 Combined
- [1037](https://en.wikipedia.org/w/index.php?title=Code_page_1037&action=edit&redlink=1) – Korea - 5080/6090 Graphics System
- [1039](https://en.wikipedia.org/w/index.php?title=Code_page_1039&action=edit&redlink=1) – GML Compatibility
- [1047](https://en.wikipedia.org/wiki/Code_page_1047) – Latin 1/Open Systems
- [1068](https://en.wikipedia.org/w/index.php?title=Code_page_1068&action=edit&redlink=1) – DCF Compatibility
- [1069](https://en.wikipedia.org/wiki/Code_page_1069) – Latin 4
- [1070](https://en.wikipedia.org/wiki/Code_page_1070) – USA / Canada Version 0 ([Code page 37](https://en.wikipedia.org/wiki/Code_page_37) Version 0)
- [1071](https://en.wikipedia.org/w/index.php?title=Code_page_1071&action=edit&redlink=1) – Germany F.R. / Austria
- [1073](https://en.wikipedia.org/w/index.php?title=Code_page_1073&action=edit&redlink=1) – Brazil
- [1074](https://en.wikipedia.org/w/index.php?title=Code_page_1074&action=edit&redlink=1) – Denmark, Norway
- [1075](https://en.wikipedia.org/w/index.php?title=Code_page_1075&action=edit&redlink=1) – Finland, Sweden
- [1076](https://en.wikipedia.org/w/index.php?title=Code_page_1076&action=edit&redlink=1) – Italy
- [1077](https://en.wikipedia.org/w/index.php?title=Code_page_1077&action=edit&redlink=1) – Japan (Latin)
- [1078](https://en.wikipedia.org/w/index.php?title=Code_page_1078&action=edit&redlink=1) – Portugal
- [1079](https://en.wikipedia.org/wiki/Code_page_1079) – Spain / Latin America Version 0 ([Code page 284](https://en.wikipedia.org/wiki/Code_page_284) Version 0)
- [1080](https://en.wikipedia.org/w/index.php?title=Code_page_1080&action=edit&redlink=1) – United Kingdom
- [1081](https://en.wikipedia.org/wiki/Code_page_1081) – France Version 0 ([Code page 297](https://en.wikipedia.org/wiki/Code_page_297) Version 0)
- [1082](https://en.wikipedia.org/w/index.php?title=Code_page_1082&action=edit&redlink=1) – Israel (Hebrew)
- [1083](https://en.wikipedia.org/w/index.php?title=Code_page_1083&action=edit&redlink=1) – Israel (Hebrew)
- [1084](https://en.wikipedia.org/wiki/Code_page_1084) – International #5 Version 0 ([Code page 500](https://en.wikipedia.org/wiki/Code_page_500) Version 0)
- [1085](https://en.wikipedia.org/w/index.php?title=Code_page_1085&action=edit&redlink=1) – Iceland
- [1087](https://en.wikipedia.org/w/index.php?title=Code_page_1087&action=edit&redlink=1) – Symbol Set
- [1091](https://en.wikipedia.org/w/index.php?title=Code_page_1091&action=edit&redlink=1) – Modified Symbols, Set 7
- 1093 – IBM Logo
- [1097](https://en.wikipedia.org/wiki/Code_page_1097) – Farsi Bilingual
- [1110](https://en.wikipedia.org/wiki/Code_page_1110) – Latin 2 (Revision of [870](https://en.wikipedia.org/wiki/Code_page_870))
- [1112](https://en.wikipedia.org/wiki/Code_page_1112) – Baltic Multilingual (same with euro: [1156](https://en.wikipedia.org/wiki/Code_page_1156))
- [1113](https://en.wikipedia.org/wiki/Code_page_1113) – Latin 6
- [1122](https://en.wikipedia.org/wiki/Code_page_1122) – Estonia (same with euro: [1157](https://en.wikipedia.org/wiki/Code_page_1157))
- [1123](https://en.wikipedia.org/wiki/Code_page_1123) – Cyrillic, Ukraine (same with euro: [1158](https://en.wikipedia.org/wiki/Code_page_1158))
- [1130](https://en.wikipedia.org/wiki/Code_page_1130) – Vietnamese (same with euro: [1164](https://en.wikipedia.org/wiki/Code_page_1164))
- [1132](https://en.wikipedia.org/wiki/Code_page_1132) – Lao EBCDIC
- [1136](https://en.wikipedia.org/w/index.php?title=Code_page_1136&action=edit&redlink=1) – Hitachi Katakana
- [1137](https://en.wikipedia.org/wiki/Code_page_1137) – Devanagari EBCDIC
- [1140](https://en.wikipedia.org/wiki/Code_page_1140) – USA, Canada, etc. ECECP (same without euro: [37](https://en.wikipedia.org/wiki/Code_page_37)) (Traditional Chinese version: [1159](https://en.wikipedia.org/wiki/Code_page_1159))
- [1141](https://en.wikipedia.org/wiki/Code_page_1141) – Austria, Germany ECECP (same without euro: [273](https://en.wikipedia.org/wiki/Code_page_273))
- [1142](https://en.wikipedia.org/wiki/Code_page_1142) – Denmark, Norway ECECP (same without euro: [277](https://en.wikipedia.org/wiki/Code_page_277))
- [1143](https://en.wikipedia.org/wiki/Code_page_1143) – Finland, Sweden ECECP (same without euro: [278](https://en.wikipedia.org/wiki/Code_page_278))
- [1144](https://en.wikipedia.org/wiki/Code_page_1144) – Italy ECECP (same without euro: [280](https://en.wikipedia.org/wiki/Code_page_280))
- [1145](https://en.wikipedia.org/wiki/Code_page_1145) – Spain, Latin America (Spanish) ECECP (same without euro: [284](https://en.wikipedia.org/wiki/Code_page_284))
- [1146](https://en.wikipedia.org/wiki/Code_page_1146) – UK ECECP (same without euro: [285](https://en.wikipedia.org/wiki/Code_page_285))
- [1147](https://en.wikipedia.org/wiki/Code_page_1147) – France ECECP with euro (same without euro: [297](https://en.wikipedia.org/wiki/Code_page_297))
- [1148](https://en.wikipedia.org/wiki/Code_page_1148) – International ECECP with euro (same without euro: [500](https://en.wikipedia.org/wiki/Code_page_500))
- [1149](https://en.wikipedia.org/wiki/Code_page_1149) – Icelandic ECECP with euro (same without euro: [871](https://en.wikipedia.org/wiki/Code_page_871))
- [1150](https://en.wikipedia.org/w/index.php?title=Code_page_1150&action=edit&redlink=1) – Korean Extended with box characters
- [1151](https://en.wikipedia.org/w/index.php?title=Code_page_1151&action=edit&redlink=1) – Simplified Chinese Extended with box characters
- [1152](https://en.wikipedia.org/w/index.php?title=Code_page_1152&action=edit&redlink=1) – Traditional Chinese Extended with box characters
- [1153](https://en.wikipedia.org/wiki/Code_page_1153) – Latin 2 Multilingual with euro (same without euro: [870](https://en.wikipedia.org/wiki/Code_page_870))
- [1154](https://en.wikipedia.org/wiki/Code_page_1154) – Cyrillic, Multilingual with euro (same without euro: [1025](https://en.wikipedia.org/wiki/Code_page_1025); an older version is [880](https://en.wikipedia.org/wiki/Code_page_880)) (A code page based on this is [1166](https://en.wikipedia.org/wiki/Code_page_1166))
- [1155](https://en.wikipedia.org/wiki/Code_page_1155) – Turkey with euro (same without euro: [1026](https://en.wikipedia.org/wiki/Code_page_1026))
- [1156](https://en.wikipedia.org/wiki/Code_page_1156) – Baltic Multi with euro (same without euro: [1112](https://en.wikipedia.org/wiki/Code_page_1112))
- [1157](https://en.wikipedia.org/wiki/Code_page_1157) – Estonia with euro (same without euro: [1122](https://en.wikipedia.org/wiki/Code_page_1122))
- [1158](https://en.wikipedia.org/wiki/Code_page_1158) – Cyrillic, Ukraine with euro (same without euro: [1123](https://en.wikipedia.org/wiki/Code_page_1123))
- [1159](https://en.wikipedia.org/wiki/Code_page_1159) – T-Chinese EBCDIC (Traditional Chinese euro update of [37](https://en.wikipedia.org/wiki/Code_page_37)) (International version: [1140](https://en.wikipedia.org/wiki/Code_page_1140))
- [1160](https://en.wikipedia.org/wiki/Code_page_1160) – Thai with Low Marks & Accented Characters with euro (same without euro: [838](https://en.wikipedia.org/wiki/Code_page_838))
- [1164](https://en.wikipedia.org/wiki/Code_page_1164) – Vietnamese with euro (same without euro: [1130](https://en.wikipedia.org/wiki/Code_page_1130))
- [1165](https://en.wikipedia.org/wiki/Code_page_1165) – Latin 2/Open Systems
- [1166](https://en.wikipedia.org/wiki/Code_page_1166) – Cyrillic Kazakh
- [1278](https://en.wikipedia.org/w/index.php?title=Code_page_1278&action=edit&redlink=1) – EBCDIC Adobe (PostScript) Standard Encoding
- [1279](https://en.wikipedia.org/w/index.php?title=Code_page_1279&action=edit&redlink=1) – Hitachi Japanese Katakana Host
- [1303](https://en.wikipedia.org/w/index.php?title=Code_page_1303&action=edit&redlink=1) – EBCDIC Bar Code
- [1364](https://en.wikipedia.org/w/index.php?title=Code_page_1364&action=edit&redlink=1) – Korea MIX ([833](https://en.wikipedia.org/wiki/Code_page_833) + [834](https://en.wikipedia.org/w/index.php?title=Code_page_834&action=edit&redlink=1) + euro) (same without euro: [933](https://en.wikipedia.org/w/index.php?title=Code_page_933&action=edit&redlink=1))
- [1371](https://en.wikipedia.org/w/index.php?title=Code_page_1371&action=edit&redlink=1) – Traditional Chinese MIX ([1159](https://en.wikipedia.org/wiki/Code_page_1159) + [835](https://en.wikipedia.org/w/index.php?title=Code_page_835&action=edit&redlink=1)) (same without euro: [937](https://en.wikipedia.org/w/index.php?title=Code_page_937&action=edit&redlink=1))
- [1376](https://en.wikipedia.org/w/index.php?title=Code_page_1376&action=edit&redlink=1) – Traditional Chinese DBCS Host extension for HKSCS
- [1377](https://en.wikipedia.org/w/index.php?title=Code_page_1377&action=edit&redlink=1) – Mixed Host HKSCS Growing ([37](https://en.wikipedia.org/wiki/Code_page_37) + [1376](https://en.wikipedia.org/w/index.php?title=Code_page_1376&action=edit&redlink=1))
- [1388](https://en.wikipedia.org/w/index.php?title=Code_page_1388&action=edit&redlink=1) – Simplified Chinese MIX (same without euro: [935](https://en.wikipedia.org/w/index.php?title=Code_page_935&action=edit&redlink=1)) ([836](https://en.wikipedia.org/wiki/Code_page_836) + [837](https://en.wikipedia.org/w/index.php?title=Code_page_837&action=edit&redlink=1) + euro)
- [1390](https://en.wikipedia.org/wiki/Code_page_1390) – Simplified Chinese MIX Japan MIX (same without euro: [930](https://en.wikipedia.org/wiki/Code_page_930)) ([290](https://en.wikipedia.org/wiki/Code_page_290) + [300](https://en.wikipedia.org/wiki/Code_page_300) + euro)
- [1399](https://en.wikipedia.org/w/index.php?title=Code_page_1399&action=edit&redlink=1) – Japan MIX ([1027](https://en.wikipedia.org/wiki/Code_page_1027) + [300](https://en.wikipedia.org/wiki/Code_page_300) + euro) (same without euro: [939](https://en.wikipedia.org/w/index.php?title=Code_page_939&action=edit&redlink=1))

### DOS code pages[[edit](https://en.wikipedia.org/w/index.php?title=Code_page&action=edit&section=6)]

These code pages are used by IBM in its [PC DOS](https://en.wikipedia.org/wiki/PC_DOS) operating system. These code pages were originally embedded directly in the [text mode](https://en.wikipedia.org/wiki/Text_mode) hardware of the graphic adapters used with the [IBM PC](https://en.wikipedia.org/wiki/IBM_PC) and its clones, including the original MDA and CGA adapters whose character sets could only be changed by physically replacing a ROM chip that contained the font. The interface of those adapters (emulated by all later adapters such as VGA) was typically limited to single byte character sets with only 256 characters in each font/encoding (although VGA added partial support for slightly larger character sets).

- [301](https://en.wikipedia.org/wiki/Code_page_301) – IBM-PC Japan (Kanji) DBCS
- [437](https://en.wikipedia.org/wiki/Code_page_437) – Original IBM PC hardware code page
- [720](https://en.wikipedia.org/wiki/Code_page_720) – Arabic (Transparent ASMO)
- [737](https://en.wikipedia.org/wiki/Code_page_737) – [Greek](https://en.wikipedia.org/wiki/Greek_language)
- [775](https://en.wikipedia.org/wiki/Code_page_775) – Latin-7
- [808](https://en.wikipedia.org/wiki/Code_page_808) – Russian with euro (same without euro: [866](https://en.wikipedia.org/wiki/Code_page_866))
- [848](https://en.wikipedia.org/wiki/Code_page_848) – Ukrainian with euro (same without euro: [1125](https://en.wikipedia.org/wiki/Code_page_1125))
- [849](https://en.wikipedia.org/wiki/Code_page_849) – Belorussian with euro (same without euro: [1131](https://en.wikipedia.org/wiki/Code_page_1131))
- [850](https://en.wikipedia.org/wiki/Code_page_850) – Latin-1
- [851](https://en.wikipedia.org/wiki/Code_page_851) – Greek
- [852](https://en.wikipedia.org/wiki/Code_page_852) – Latin-2
- [853](https://en.wikipedia.org/wiki/Code_page_853) – Latin-3
- [855](https://en.wikipedia.org/wiki/Code_page_855) – [Cyrillic](https://en.wikipedia.org/wiki/Cyrillic_script) (same with euro: [872](https://en.wikipedia.org/wiki/Code_page_872))
- [856](https://en.wikipedia.org/wiki/Code_page_856) – [Hebrew](https://en.wikipedia.org/wiki/Hebrew_alphabet)
- [857](https://en.wikipedia.org/wiki/Code_page_857) – Latin-5
- [858](https://en.wikipedia.org/wiki/Code_page_858) – Latin-1 with [euro](https://en.wikipedia.org/wiki/Euro) symbol
- [859](https://en.wikipedia.org/wiki/Code_page_859) – Latin-9
- [860](https://en.wikipedia.org/wiki/Code_page_860) – [Portuguese](https://en.wikipedia.org/wiki/Portuguese_language)
- [861](https://en.wikipedia.org/wiki/Code_page_861) – [Icelandic](https://en.wikipedia.org/wiki/Icelandic_language)
- [862](https://en.wikipedia.org/wiki/Code_page_862) – [Hebrew](https://en.wikipedia.org/wiki/Hebrew_language)
- [863](https://en.wikipedia.org/wiki/Code_page_863) – [Canadian French](https://en.wikipedia.org/wiki/French_language)
- [864](https://en.wikipedia.org/wiki/Code_page_864) – [Arabic](https://en.wikipedia.org/wiki/Arabic_language)
- [865](https://en.wikipedia.org/wiki/Code_page_865) – [Danish](https://en.wikipedia.org/wiki/Danish_language)/[Norwegian](https://en.wikipedia.org/wiki/Norwegian_language)
- [866](https://en.wikipedia.org/wiki/Code_page_866) – Belarusian, Russian, Ukrainian (same with euro: [808](https://en.wikipedia.org/wiki/Code_page_808))
- [867](https://en.wikipedia.org/wiki/Code_page_867) – [Hebrew](https://en.wikipedia.org/wiki/Hebrew_language) + euro (based on CP862) (conflictive ID: NEC [Czech (Kamenický)](https://en.wikipedia.org/wiki/Kamenický_encoding), which was created before this codepage)
- [868](https://en.wikipedia.org/wiki/Code_page_868) – [Urdu](https://en.wikipedia.org/wiki/Urdu_language)
- [869](https://en.wikipedia.org/wiki/Code_page_869) – [Greek](https://en.wikipedia.org/wiki/Greek_alphabet)
- [872](https://en.wikipedia.org/wiki/Code_page_872) – Cyrillic with euro (same without euro: [855](https://en.wikipedia.org/wiki/Code_page_855))
- [874](https://en.wikipedia.org/wiki/Code_page_874) – Thai with Low Tone Marks & Ancient Chars (conflictive ID with Windows 874; version with euro: [1161](https://en.wikipedia.org/wiki/Code_page_1161) Windows version: is IBM [1162](https://en.wikipedia.org/wiki/Code_page_1162))
- [876](https://en.wikipedia.org/w/index.php?title=Code_page_876&action=edit&redlink=1) – OCR A
- [877](https://en.wikipedia.org/w/index.php?title=Code_page_877&action=edit&redlink=1) – OCR B
- [878](https://en.wikipedia.org/wiki/Code_page_878) – [KOI8-R](https://en.wikipedia.org/wiki/KOI8-R)
- [891](https://en.wikipedia.org/w/index.php?title=Code_page_891&action=edit&redlink=1) – Korean PC SBCS
- [898](https://en.wikipedia.org/w/index.php?title=Code_page_898&action=edit&redlink=1) – IBM-PC WP Multilingual
- [899](https://en.wikipedia.org/w/index.php?title=Code_page_899&action=edit&redlink=1) – IBM-PC Symbol
- [903](https://en.wikipedia.org/wiki/Code_page_903) – Simplified Chinese PC SBCS
- [904](https://en.wikipedia.org/wiki/Code_page_904) – Traditional Chinese PC SBCS
- [906](https://en.wikipedia.org/w/index.php?title=Code_page_906&action=edit&redlink=1) – International Set #5 3812/3820
- [907](https://en.wikipedia.org/wiki/Code_page_907) – ASCII APL (3812)
- [909](https://en.wikipedia.org/w/index.php?title=Code_page_909&action=edit&redlink=1) – IBM-PC APL2 Extended
- [910](https://en.wikipedia.org/w/index.php?title=Code_page_910&action=edit&redlink=1) – IBM-PC APL2
- [911](https://en.wikipedia.org/w/index.php?title=Code_page_911&action=edit&redlink=1) – IBM-PC Japan #1
- [926](https://en.wikipedia.org/w/index.php?title=Code_page_926&action=edit&redlink=1) – Korean PC DBCS
- [927](https://en.wikipedia.org/w/index.php?title=Code_page_927&action=edit&redlink=1) – Traditional Chinese PC DBCS
- [928](https://en.wikipedia.org/wiki/Code_page_928) – Simplified Chinese PC DBCS
- [929](https://en.wikipedia.org/w/index.php?title=Code_page_929&action=edit&redlink=1) – Thai PC DBCS
- [932](https://en.wikipedia.org/wiki/Code_page_932_(IBM)) – IBM-PC Japan MIX (DOS/V) (DBCS) ([897](https://en.wikipedia.org/wiki/Code_page_897) + [301](https://en.wikipedia.org/wiki/Code_page_301)) (conflictive ID with Windows 932; Windows version is IBM 943)
- [934](https://en.wikipedia.org/w/index.php?title=Code_page_934&action=edit&redlink=1) – IBM-PC Korea MIX (DOS/V) (DBCS) ([891](https://en.wikipedia.org/w/index.php?title=Code_page_891&action=edit&redlink=1) + [926](https://en.wikipedia.org/w/index.php?title=Code_page_926&action=edit&redlink=1))
- [936](https://en.wikipedia.org/wiki/Code_page_936_(IBM)) – IBM-PC Simplified Chinese MIX (gb2312) (DOS/V) (DBCS) ([903](https://en.wikipedia.org/wiki/Code_page_903) + [928](https://en.wikipedia.org/wiki/Code_page_928)) (conflictive ID with Windows 936; Windows version is IBM 1386)
- [938](https://en.wikipedia.org/w/index.php?title=Code_page_938&action=edit&redlink=1) – IBM-PC Traditional Chinese MIX (DOS/V, OS/2) ([904](https://en.wikipedia.org/wiki/Code_page_904) + [927](https://en.wikipedia.org/w/index.php?title=Code_page_927&action=edit&redlink=1))
- [942](https://en.wikipedia.org/wiki/Code_page_942) – IBM-PC Japan MIX (Japanese SAA (OS/2)) ([1041](https://en.wikipedia.org/wiki/Code_page_1041) + [301](https://en.wikipedia.org/wiki/Code_page_301))
- [943](https://en.wikipedia.org/wiki/Code_page_943) – IBM-PC Japan OPEN ([897](https://en.wikipedia.org/wiki/Code_page_897) + [941](https://en.wikipedia.org/wiki/Code_page_941)) (Windows CP 932)
- [944](https://en.wikipedia.org/w/index.php?title=Code_page_944&action=edit&redlink=1) – IBM-PC Korea MIX (Korean SAA (OS/2)) ([1040](https://en.wikipedia.org/wiki/Code_page_1040) + [926](https://en.wikipedia.org/w/index.php?title=Code_page_926&action=edit&redlink=1))
- [946](https://en.wikipedia.org/w/index.php?title=Code_page_946&action=edit&redlink=1) – IBM-PC Simplified Chinese (Simplified Chinese SAA (OS/2)) ([1042](https://en.wikipedia.org/wiki/Code_page_1042) + [928](https://en.wikipedia.org/wiki/Code_page_928))
- [948](https://en.wikipedia.org/w/index.php?title=Code_page_948&action=edit&redlink=1) – IBM-PC Traditional Chinese (Traditional Chinese SAA (OS/2)) ([1043](https://en.wikipedia.org/wiki/Code_page_1043) + [927](https://en.wikipedia.org/w/index.php?title=Code_page_927&action=edit&redlink=1))
- [949](https://en.wikipedia.org/wiki/Code_page_949_(IBM)) – Korean (Extended Wansung (ks_c_5601-1987)) ([1088](https://en.wikipedia.org/wiki/Code_page_1088) + [951](https://en.wikipedia.org/wiki/Code_page_951)) (conflictive ID with Windows 949 (Unified Hangul Code); Windows version is IBM 1363)
- [951](https://en.wikipedia.org/wiki/Code_page_951) – Korean DBCS (IBM KS Code) (conflictive ID with Windows 951, a hack of Windows 950 with Unicode mappings for some PUA Unicode characters found in HKSCS, based on the file name)
- [1034](https://en.wikipedia.org/w/index.php?title=Code_page_1034&action=edit&redlink=1) – Printer Application - Shipping Label, Set #2
- [1040](https://en.wikipedia.org/wiki/Code_page_1040) – Korean Extended
- [1041](https://en.wikipedia.org/wiki/Code_page_1041) – Japanese Extended (JIS X 0201 Extended)
- [1042](https://en.wikipedia.org/wiki/Code_page_1042) – Simplified Chinese Extended
- [1043](https://en.wikipedia.org/wiki/Code_page_1043) – Traditional Chinese Extended
- [1044](https://en.wikipedia.org/w/index.php?title=Code_page_1044&action=edit&redlink=1) – Printer Application - Shipping Label, Set #1
- [1046](https://en.wikipedia.org/wiki/Code_page_1046) – Arabic Extended (Euro)
- [1086](https://en.wikipedia.org/w/index.php?title=Code_page_1086&action=edit&redlink=1) – IBM-PC Japan #1
- [1088](https://en.wikipedia.org/wiki/Code_page_1088) – Revised Korean (SBCS)
- [1092](https://en.wikipedia.org/w/index.php?title=Code_page_1092&action=edit&redlink=1) – IBM-PC Modified Symbols
- [1098](https://en.wikipedia.org/wiki/Code_page_1098) – [Farsi](https://en.wikipedia.org/wiki/Persian_language)
- [1108](https://en.wikipedia.org/w/index.php?title=Code_page_1108&action=edit&redlink=1) – DITROFF Base Compatibility
- [1109](https://en.wikipedia.org/w/index.php?title=Code_page_1109&action=edit&redlink=1) – DITROFF Specials Compatibility
- [1115](https://en.wikipedia.org/wiki/Code_page_1115) – IBM-PC People's Republic of China
- [1116](https://en.wikipedia.org/wiki/Code_page_1116) – Estonian
- [1117](https://en.wikipedia.org/wiki/Code_page_1117) – Latvian
- [1118](https://en.wikipedia.org/wiki/Code_page_1118) – Lithuanian (IBM's implementation of Lika's [code page 774](https://en.wikipedia.org/wiki/Code_page_774))
- [1119](https://en.wikipedia.org/wiki/Code_page_1119) – Lithuanian and Russian (IBM's implementation of Lika's [code page 772](https://en.wikipedia.org/wiki/Code_page_772))
- [1125](https://en.wikipedia.org/wiki/Code_page_1125) – Cyrillic, Ukrainian (same with euro: [848](https://en.wikipedia.org/wiki/Code_page_848)) (IBM modifocation of [RUSCII](https://en.wikipedia.org/w/index.php?title=RUSCII_character_set&action=edit&redlink=1))
- [1127](https://en.wikipedia.org/wiki/Code_page_1127) – IBM-PC Arabic / French
- [1131](https://en.wikipedia.org/wiki/Code_page_1131) – IBM-PC Data, Cyrillic, Belarusian (same with euro: [849](https://en.wikipedia.org/wiki/Code_page_849))
- [1139](https://en.wikipedia.org/w/index.php?title=Code_page_1139&action=edit&redlink=1) – Japan Alphanumeric Katakana
- [1161](https://en.wikipedia.org/wiki/Code_page_1161) – Thai with Low Tone Marks & Ancient Chars with euro (same without euro: [874](https://en.wikipedia.org/wiki/Code_page_874))
- [1167](https://en.wikipedia.org/wiki/Code_page_1167) – [KOI8-RU](https://en.wikipedia.org/wiki/KOI8-RU)
- [1168](https://en.wikipedia.org/wiki/Code_page_1168) – [KOI8-U](https://en.wikipedia.org/wiki/KOI8-U)
- [1300](https://en.wikipedia.org/w/index.php?title=Code_page_1300&action=edit&redlink=1) – ANSI [PTS-DOS 6.70, not 6.51]
- [1370](https://en.wikipedia.org/wiki/Code_page_1370) – Traditional Chinese MIX ([Big5 encoding](https://en.wikipedia.org/wiki/Big5)) ([1114](https://en.wikipedia.org/wiki/Code_page_1114) + [947](https://en.wikipedia.org/w/index.php?title=Code_page_947&action=edit&redlink=1) + euro) (same without euro: [950](https://en.wikipedia.org/wiki/Code_page_950))
- [1380](https://en.wikipedia.org/w/index.php?title=Code_page_1380&action=edit&redlink=1) – IBM-PC Simplified Chinese GB PC-DATA (DBCS PC IBM GB 2312-80)
- [1381](https://en.wikipedia.org/w/index.php?title=Code_page_1381&action=edit&redlink=1) – IBM-PC Simplified Chinese ([1115](https://en.wikipedia.org/wiki/Code_page_1115) + [1380](https://en.wikipedia.org/w/index.php?title=Code_page_1380&action=edit&redlink=1))
- [1393](https://en.wikipedia.org/w/index.php?title=Code_page_1393&action=edit&redlink=1) – Japanese JIS X 0213 DBCS
- [1394](https://en.wikipedia.org/w/index.php?title=Code_page_1394&action=edit&redlink=1) – IBM-PC Japan (JIS X 0213) ([897](https://en.wikipedia.org/wiki/Code_page_897) + [1393](https://en.wikipedia.org/w/index.php?title=Code_page_1393&action=edit&redlink=1))

When dealing with older hardware, protocols and file formats, it is often necessary to support these code pages, but newer encoding systems, in particular Unicode, are encouraged for new designs.

DOS code pages are typically stored in .CPI files.

### IBM AIX code pages

These code pages are used by IBM in its [AIX](https://en.wikipedia.org/wiki/AIX) operating system. They emulate several character sets, namely those ones designed to be used accordingly to ISO, such as UNIX-like operating systems.

- [367](https://en.wikipedia.org/wiki/Code_page_367) – 7-bit US-ASCII
- [371](https://en.wikipedia.org/w/index.php?title=Code_page_371&action=edit&redlink=1) – 7-bit US-ASCII APL
- [806](https://en.wikipedia.org/wiki/Code_page_806) – ISCII
- [813](https://en.wikipedia.org/wiki/Code_page_813) – [ISO 8859-7](https://en.wikipedia.org/wiki/ISO_8859-7)
- [819](https://en.wikipedia.org/wiki/Code_page_819) – [ISO 8859-1](https://en.wikipedia.org/wiki/ISO_8859-1)
- [895](https://en.wikipedia.org/wiki/Code_page_895) – 7-bit Japan Latin
- [896](https://en.wikipedia.org/wiki/Code_page_896) – 7-bit Japan Katakana Extended
- [901](https://en.wikipedia.org/wiki/Code_page_901) – Extension of [ISO 8859-13](https://en.wikipedia.org/wiki/ISO_8859-13) with euro (same without euro: [921](https://en.wikipedia.org/wiki/Code_page_921))
- [902](https://en.wikipedia.org/wiki/Code_page_902) – ISO Estonian with euro (same without euro: [922](https://en.wikipedia.org/wiki/Code_page_922))
- [912](https://en.wikipedia.org/wiki/Code_page_912) – Extension of [ISO 8859-2](https://en.wikipedia.org/wiki/ISO_8859-2)
- [913](https://en.wikipedia.org/wiki/Code_page_913) – [ISO 8859-3](https://en.wikipedia.org/wiki/ISO_8859-3)
- [914](https://en.wikipedia.org/wiki/Code_page_914) – [ISO 8859-4](https://en.wikipedia.org/wiki/ISO_8859-4)
- [915](https://en.wikipedia.org/wiki/Code_page_915) – Extension of [ISO 8859-5](https://en.wikipedia.org/wiki/ISO_8859-5)
- [916](https://en.wikipedia.org/wiki/Code_page_916) – [ISO 8859-8](https://en.wikipedia.org/wiki/ISO_8859-8)
- [919](https://en.wikipedia.org/wiki/Code_page_919) – [ISO 8859-10](https://en.wikipedia.org/wiki/ISO_8859-10)
- [920](https://en.wikipedia.org/wiki/Code_page_920) – [ISO 8859-9](https://en.wikipedia.org/wiki/ISO_8859-9)
- [921](https://en.wikipedia.org/wiki/Code_page_921) – Extension of [ISO 8859-13](https://en.wikipedia.org/wiki/ISO_8859-13) (same with euro: [901](https://en.wikipedia.org/wiki/Code_page_901))
- [922](https://en.wikipedia.org/wiki/Code_page_922) – ISO Estonian (same with euro: [902](https://en.wikipedia.org/wiki/Code_page_902))
- [923](https://en.wikipedia.org/wiki/Code_page_923) – [ISO 8859-15](https://en.wikipedia.org/wiki/ISO_8859-15)
- [952](https://en.wikipedia.org/wiki/Code_page_952) – EUC Japanese for JIS X 0208
- [953](https://en.wikipedia.org/wiki/Code_page_953) – EUC Japanese for JIS X 0212
- [954](https://en.wikipedia.org/wiki/Code_page_954) – EUC Japanese ([895](https://en.wikipedia.org/wiki/Code_page_895) + [952](https://en.wikipedia.org/wiki/Code_page_952) + [896](https://en.wikipedia.org/wiki/Code_page_896) + [953](https://en.wikipedia.org/wiki/Code_page_953))
- [955](https://en.wikipedia.org/wiki/Code_page_955) – TCP Japanese, JIS X 0208-1978
- [956](https://en.wikipedia.org/w/index.php?title=Code_page_956&action=edit&redlink=1) – TCP Japanese ([895](https://en.wikipedia.org/wiki/Code_page_895) + [952](https://en.wikipedia.org/wiki/Code_page_952) + [896](https://en.wikipedia.org/wiki/Code_page_896) + [953](https://en.wikipedia.org/wiki/Code_page_953))
- [957](https://en.wikipedia.org/w/index.php?title=Code_page_957&action=edit&redlink=1) – TCP Japanese ([895](https://en.wikipedia.org/wiki/Code_page_895) + [955](https://en.wikipedia.org/wiki/Code_page_955) + [896](https://en.wikipedia.org/wiki/Code_page_896) + [953](https://en.wikipedia.org/wiki/Code_page_953))
- [958](https://en.wikipedia.org/w/index.php?title=Code_page_958&action=edit&redlink=1) – TCP Japanese ([367](https://en.wikipedia.org/wiki/Code_page_367) + [952](https://en.wikipedia.org/wiki/Code_page_952) + [896](https://en.wikipedia.org/wiki/Code_page_896) + [953](https://en.wikipedia.org/wiki/Code_page_953))
- [959](https://en.wikipedia.org/w/index.php?title=Code_page_959&action=edit&redlink=1) – TCP Japanese ([367](https://en.wikipedia.org/wiki/Code_page_367) + [955](https://en.wikipedia.org/wiki/Code_page_955) + [896](https://en.wikipedia.org/wiki/Code_page_896) + [953](https://en.wikipedia.org/wiki/Code_page_953))
- [960](https://en.wikipedia.org/w/index.php?title=Code_page_960&action=edit&redlink=1) – Traditional Chinese DBCS-EUC SICGCC Primary Set (1st plane)
- [961](https://en.wikipedia.org/w/index.php?title=Code_page_961&action=edit&redlink=1) – Traditional Chinese DBCS-EUC SICGCC Full Set + IBM Select + UDC
- [963](https://en.wikipedia.org/w/index.php?title=Code_page_963&action=edit&redlink=1) – Traditional Chinese TCP, CNS 11643 plane 2 only
- [964](https://en.wikipedia.org/w/index.php?title=Code_page_964&action=edit&redlink=1) – EUC Traditional Chinese ([367](https://en.wikipedia.org/wiki/Code_page_367) + [960](https://en.wikipedia.org/w/index.php?title=Code_page_960&action=edit&redlink=1) + [961](https://en.wikipedia.org/w/index.php?title=Code_page_961&action=edit&redlink=1))
- [965](https://en.wikipedia.org/w/index.php?title=Code_page_965&action=edit&redlink=1) – TCP Traditional Chinese ([367](https://en.wikipedia.org/wiki/Code_page_367) + [960](https://en.wikipedia.org/w/index.php?title=Code_page_960&action=edit&redlink=1) + [963](https://en.wikipedia.org/w/index.php?title=Code_page_963&action=edit&redlink=1))
- [970](https://en.wikipedia.org/wiki/Code_page_970) – EUC Korean ([367](https://en.wikipedia.org/wiki/Code_page_367) + [971](https://en.wikipedia.org/w/index.php?title=Code_page_971&action=edit&redlink=1))
- [971](https://en.wikipedia.org/w/index.php?title=Code_page_971&action=edit&redlink=1) – EUC Korean DBCS (G1, KSC 5601 1989 (including 188 UDC))
- [1006](https://en.wikipedia.org/wiki/Code_page_1006) – ISO 8-bit Urdu
- [1008](https://en.wikipedia.org/wiki/Code_page_1008) – ISO 8-bit Arabic
- [1009](https://en.wikipedia.org/wiki/Code_page_1009) – 7-bit ISO IRV
- [1010](https://en.wikipedia.org/wiki/Code_page_1010) – 7-bit France
- [1011](https://en.wikipedia.org/wiki/Code_page_1011) – 7-bit Germany F.R.
- [1012](https://en.wikipedia.org/wiki/Code_page_1012) – 7-bit Italy
- [1013](https://en.wikipedia.org/wiki/Code_page_1013) – 7-bit United Kingdom
- [1014](https://en.wikipedia.org/wiki/Code_page_1014) – 7-bit Spain
- [1015](https://en.wikipedia.org/wiki/Code_page_1015) – 7-bit Portugal
- [1016](https://en.wikipedia.org/wiki/Code_page_1016) – 7-bit Norway
- [1017](https://en.wikipedia.org/wiki/Code_page_1017) – 7-bit Denmark
- [1018](https://en.wikipedia.org/wiki/Code_page_1018) – 7-bit Finland/Sweden
- [1019](https://en.wikipedia.org/wiki/Code_page_1019) – 7-bit Netherlands
- [1029](https://en.wikipedia.org/w/index.php?title=Code_page_1029&action=edit&redlink=1) – Arabic Extended
- [1036](https://en.wikipedia.org/wiki/Code_page_1036) – CCITT T.61
- [1089](https://en.wikipedia.org/wiki/Code_page_1089) – [ISO 8859-6](https://en.wikipedia.org/wiki/ISO_8859-6)
- [1111](https://en.wikipedia.org/wiki/Code_page_1111) – [ISO 8859-2](https://en.wikipedia.org/wiki/ISO_8859-2)
- [1124](https://en.wikipedia.org/wiki/Code_page_1124) – ISO Ukrainian, similar to [ISO 8859-5](https://en.wikipedia.org/wiki/ISO_8859-5)
- [1129](https://en.wikipedia.org/wiki/Code_page_1129) – ISO Vietnamese (same with euro: [1163](https://en.wikipedia.org/wiki/Code_page_1163))
- [1133](https://en.wikipedia.org/wiki/Code_page_1133) – ISO Lao
- [1163](https://en.wikipedia.org/wiki/Code_page_1163) – ISO Vietnamese with euro (same without euro: [1129](https://en.wikipedia.org/wiki/Code_page_1129))
- [1350](https://en.wikipedia.org/w/index.php?title=Code_page_1350&action=edit&redlink=1) – EUC Japanese (JISeucJP) ([367](https://en.wikipedia.org/wiki/Code_page_367) + [952](https://en.wikipedia.org/wiki/Code_page_952) + [896](https://en.wikipedia.org/wiki/Code_page_896) + [953](https://en.wikipedia.org/wiki/Code_page_953))
- [1382](https://en.wikipedia.org/w/index.php?title=Code_page_1382&action=edit&redlink=1) – EUC Simplified Chinese (DBCS PC GB 2312-80)
- [1383](https://en.wikipedia.org/w/index.php?title=Code_page_1383&action=edit&redlink=1) – EUC Simplified Chinese ([367](https://en.wikipedia.org/wiki/Code_page_367) + [1382](https://en.wikipedia.org/w/index.php?title=Code_page_1382&action=edit&redlink=1))

Code page 819 is identical to Latin-1, [ISO/IEC 8859-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1), and with slightly-modified commands, permits MS-DOS machines to use that encoding. It was used with IBM AS/400 minicomputers.

### IBM OS/2 code pages

These code pages are used by IBM in its [OS/2](https://en.wikipedia.org/wiki/DOS#DOS_under_OS.2F2_and_Windows) operating system.

- [1004](https://en.wikipedia.org/wiki/Code_page_1004) – Latin-1 Extended, Desk Top Publishing/Windows[[20\]](https://en.wikipedia.org/wiki/Code_page#cite_note-IBM_CP1004-20)

### Windows emulation code pages

These code pages are used by IBM when emulating the [Microsoft Windows](https://en.wikipedia.org/wiki/Microsoft_Windows) character sets. Most of these code pages have the same number as Microsoft code pages, although they are not **exactly** identical. Some code pages, though, are new from IBM, not devised by Microsoft.

- [897](https://en.wikipedia.org/wiki/Code_page_897) – IBM-PC SBCS Japanese (JIS X 0201-1976)
- [941](https://en.wikipedia.org/wiki/Code_page_941) – IBM-PC Japanese DBCS for Open environment
- [947](https://en.wikipedia.org/w/index.php?title=Code_page_947&action=edit&redlink=1) – IBM-PC DBCS for ([Big5 encoding](https://en.wikipedia.org/wiki/Big5))
- [950](https://en.wikipedia.org/wiki/Code_page_950) – Traditional Chinese MIX ([Big5 encoding](https://en.wikipedia.org/wiki/Big5)) ([1114](https://en.wikipedia.org/wiki/Code_page_1114) + [947](https://en.wikipedia.org/w/index.php?title=Code_page_947&action=edit&redlink=1)) (same with euro: [1370](https://en.wikipedia.org/wiki/Code_page_1370))
- [1114](https://en.wikipedia.org/wiki/Code_page_1114) – IBM-PC SBCS (Simplified Chinese; [GBK](https://en.wikipedia.org/wiki/GBK_(character_encoding)); Traditional Chinese; [Big5 encoding](https://en.wikipedia.org/wiki/Big5))
- [1126](https://en.wikipedia.org/wiki/Code_page_1126) – IBM-PC Korean SBCS
- [1162](https://en.wikipedia.org/wiki/Code_page_1162) – Windows Thai (Extension of [874](https://en.wikipedia.org/wiki/Code_page_874); but still called that in Windows)
- [1169](https://en.wikipedia.org/wiki/Code_page_1169) – Windows Cyrillic Asian
- [1174](https://en.wikipedia.org/w/index.php?title=Code_page_1174&action=edit&redlink=1) – Windows Kazakh
- [1250](https://en.wikipedia.org/wiki/Code_page_1250) – Windows [Central Europe](https://en.wikipedia.org/wiki/Central_Europe)
- [1251](https://en.wikipedia.org/wiki/Code_page_1251) – Windows [Cyrillic](https://en.wikipedia.org/wiki/Cyrillic_script)
- [1252](https://en.wikipedia.org/wiki/Code_page_1252) – Windows [Western](https://en.wikipedia.org/wiki/Western_Europe)
- [1253](https://en.wikipedia.org/wiki/Code_page_1253) – Windows [Greek](https://en.wikipedia.org/wiki/Greek_alphabet)
- [1254](https://en.wikipedia.org/wiki/Code_page_1254) – Windows [Turkish](https://en.wikipedia.org/wiki/Turkish_alphabet)
- [1255](https://en.wikipedia.org/wiki/Code_page_1255) – Windows [Hebrew](https://en.wikipedia.org/wiki/Hebrew_alphabet)
- [1256](https://en.wikipedia.org/wiki/Code_page_1256) – Windows [Arabic](https://en.wikipedia.org/wiki/Arabic_alphabet)
- [1257](https://en.wikipedia.org/wiki/Code_page_1257) – Windows [Baltic](https://en.wikipedia.org/wiki/Baltic_languages)
- [1258](https://en.wikipedia.org/wiki/Code_page_1258) – Windows [Vietnamese](https://en.wikipedia.org/wiki/Vietnamese_alphabet)
- [1361](https://en.wikipedia.org/w/index.php?title=Code_page_1361&action=edit&redlink=1) – Korean ([JOHAB](https://en.wikipedia.org/w/index.php?title=JOHAB&action=edit&redlink=1))
- [1362](https://en.wikipedia.org/wiki/Code_page_1362) – Korean Hangul DBCS
- [1363](https://en.wikipedia.org/wiki/Code_page_1363) – Windows Korean ([1126](https://en.wikipedia.org/wiki/Code_page_1126) + [1362](https://en.wikipedia.org/wiki/Code_page_1362)) (Windows CP 949)
- [1372](https://en.wikipedia.org/w/index.php?title=Code_page_1372&action=edit&redlink=1) – IBM-PC MS T Chinese [Big5 encoding](https://en.wikipedia.org/wiki/Big5) (Special for DB2)
- [1373](https://en.wikipedia.org/wiki/Code_page_1373) – Windows Traditional Chinese (extension of [950](https://en.wikipedia.org/wiki/Code_page_950))
- [1374](https://en.wikipedia.org/w/index.php?title=Code_page_1374&action=edit&redlink=1) – IBM-PC DB [Big5 encoding](https://en.wikipedia.org/wiki/Big5) extension for HKSCS
- [1375](https://en.wikipedia.org/w/index.php?title=Code_page_1375&action=edit&redlink=1) – Mixed [Big5 encoding](https://en.wikipedia.org/wiki/Big5) extension for HKSCS (intended to match [950](https://en.wikipedia.org/wiki/Code_page_950))
- [1385](https://en.wikipedia.org/w/index.php?title=Code_page_1385&action=edit&redlink=1) – IBM-PC Simplified Chinese DBCS (Growing CS for GB18030, also used for GBK PC-DATA.)
- [1386](https://en.wikipedia.org/wiki/Code_page_1386) – IBM-PC Simplified Chinese GBK ([1114](https://en.wikipedia.org/wiki/Code_page_1114) + [1385](https://en.wikipedia.org/w/index.php?title=Code_page_1385&action=edit&redlink=1)) (Windows CP 936)
- [1391](https://en.wikipedia.org/w/index.php?title=Code_page_1391&action=edit&redlink=1) – Simplified Chinese 4 Byte (Growing CS for GB18030, also used for GBK PC-DATA.)
- [1392](https://en.wikipedia.org/wiki/Code_page_1392) – IBM-PC Simplified Chinese MIX ([1252](https://en.wikipedia.org/wiki/Code_page_1252) + [1385](https://en.wikipedia.org/w/index.php?title=Code_page_1385&action=edit&redlink=1) + [1391](https://en.wikipedia.org/w/index.php?title=Code_page_1391&action=edit&redlink=1))

### Macintosh emulation code pages

These code pages are used by IBM when emulating the Apple [Macintosh](https://en.wikipedia.org/wiki/Macintosh) character sets.

- [1275](https://en.wikipedia.org/wiki/Code_page_1275) – Apple Roman
- [1280](https://en.wikipedia.org/wiki/Code_page_1280) – Apple Greek
- [1281](https://en.wikipedia.org/wiki/Code_page_1281) – Apple Turkish
- [1282](https://en.wikipedia.org/wiki/Code_page_1282) – Apple Central European
- [1283](https://en.wikipedia.org/wiki/Code_page_1283) – Apple Cyrillic
- [1284](https://en.wikipedia.org/wiki/Code_page_1284) – Apple Croatian
- [1285](https://en.wikipedia.org/wiki/Code_page_1285) – Apple Romanian
- [1286](https://en.wikipedia.org/wiki/Code_page_1286) – Apple Icelandic

### Adobe emulation code pages

These code pages are used by IBM when emulating the [Adobe](https://en.wikipedia.org/wiki/Adobe_Systems) character sets.

- [1038](https://en.wikipedia.org/wiki/Code_page_1038) – Adobe Symbol Encoding
- [1276](https://en.wikipedia.org/wiki/Code_page_1276) – Adobe (PostScript) Standard Encoding
- [1277](https://en.wikipedia.org/wiki/Code_page_1277) – Adobe (PostScript) Latin 1

### HP emulation code pages

These code pages are used by IBM when emulating the [HP](https://en.wikipedia.org/wiki/Hewlett-Packard) character sets.

- [1050](https://en.wikipedia.org/wiki/Code_page_1050) – HP Roman Extension
- [1051](https://en.wikipedia.org/wiki/Code_page_1051) – HP Roman-8
- [1052](https://en.wikipedia.org/w/index.php?title=Code_page_1052&action=edit&redlink=1) – HP Gothic Legal
- [1053](https://en.wikipedia.org/w/index.php?title=Code_page_1053&action=edit&redlink=1) – HP Gothic-1 (almost the same as [ISO 8859-1](https://en.wikipedia.org/wiki/ISO_8859-1))
- [1054](https://en.wikipedia.org/w/index.php?title=Code_page_1054&action=edit&redlink=1) – HP ASCII
- [1055](https://en.wikipedia.org/w/index.php?title=Code_page_1055&action=edit&redlink=1) – HP PC-Line
- [1056](https://en.wikipedia.org/w/index.php?title=Code_page_1056&action=edit&redlink=1) – HP Line Draw
- [1057](https://en.wikipedia.org/wiki/Code_page_1057) – HP PC-8 (almost the same as [code page 437](https://en.wikipedia.org/wiki/Code_page_437))
- [1058](https://en.wikipedia.org/w/index.php?title=Code_page_1058&action=edit&redlink=1) – HP PC-8DN (**not** the same as [code page 865](https://en.wikipedia.org/wiki/Code_page_865))
- [1351](https://en.wikipedia.org/w/index.php?title=Code_page_1351&action=edit&redlink=1) – Japanese DBCS HP character set
- [5039](https://en.wikipedia.org/w/index.php?title=Code_page_5039&action=edit&redlink=1) – Japanese MIX ([1041](https://en.wikipedia.org/wiki/Code_page_1041) + [1351](https://en.wikipedia.org/w/index.php?title=Code_page_1351&action=edit&redlink=1))

### DEC emulation code pages

These code pages are used by IBM when emulating the [DEC](https://en.wikipedia.org/wiki/Digital_Equipment_Corporation) character sets.

- [1020](https://en.wikipedia.org/wiki/Code_page_1020) – 7-bit Canadian (French) NRC Set
- [1021](https://en.wikipedia.org/wiki/Code_page_1021) – 7-bit Switzerland NRC Set
- [1023](https://en.wikipedia.org/wiki/Code_page_1023) – 7-bit Spanish NRC Set
- [1090](https://en.wikipedia.org/wiki/Code_page_1090) – Special Characters and Line Drawing Set
- [1100](https://en.wikipedia.org/wiki/Multinational_Character_Set) – DEC Multinational
- [1101](https://en.wikipedia.org/wiki/Code_page_1101) – 7-bit British NRC Set
- [1102](https://en.wikipedia.org/wiki/Code_page_1102) – 7-bit Dutch NRC Set
- [1103](https://en.wikipedia.org/wiki/Code_page_1103) – 7-bit Finnish NRC Set
- [1104](https://en.wikipedia.org/wiki/Code_page_1104) – 7-bit French NRC Set
- [1105](https://en.wikipedia.org/wiki/Code_page_1105) – 7-bit Norwegian/Danish NRC Set
- [1106](https://en.wikipedia.org/wiki/Code_page_1106) – 7-bit Swedish NRC Set
- [1107](https://en.wikipedia.org/wiki/Code_page_1107) – 7-bit Norwegian/Danish NRC Alternate
- [1287](https://en.wikipedia.org/wiki/Code_Page_1287) – DEC Greek
- [1288](https://en.wikipedia.org/wiki/Code_Page_1288) – DEC Turkish

### IBM Unicode code pages

- [1200](https://en.wikipedia.org/wiki/Code_page_1200) – [UTF-16BE](https://en.wikipedia.org/wiki/UTF-16BE) Unicode ([big-endian](https://en.wikipedia.org/wiki/Big-endian)) with IBM [Private Use Area](https://en.wikipedia.org/wiki/Private_Use_Area) (PUA)
- [1201](https://en.wikipedia.org/wiki/Code_page_1201) – [UTF-16BE](https://en.wikipedia.org/wiki/UTF-16BE) Unicode ([big-endian](https://en.wikipedia.org/wiki/Big-endian))
- [1202](https://en.wikipedia.org/w/index.php?title=Code_page_1202&action=edit&redlink=1) – [UTF-16LE](https://en.wikipedia.org/wiki/UTF-16LE) Unicode ([little-endian](https://en.wikipedia.org/wiki/Little-endian)) with IBM PUA
- [1203](https://en.wikipedia.org/w/index.php?title=Code_page_1203&action=edit&redlink=1) – [UTF-16LE](https://en.wikipedia.org/wiki/UTF-16LE) Unicode ([little-endian](https://en.wikipedia.org/wiki/Little-endian))
- [1208](https://en.wikipedia.org/w/index.php?title=Code_page_1208&action=edit&redlink=1) – [UTF-8](https://en.wikipedia.org/wiki/UTF-8) Unicode with IBM PUA
- [1209](https://en.wikipedia.org/w/index.php?title=Code_page_1209&action=edit&redlink=1) – [UTF-8](https://en.wikipedia.org/wiki/UTF-8) Unicode
- [1400](https://en.wikipedia.org/w/index.php?title=Code_page_1400&action=edit&redlink=1) – ISO 10646 UCS-BMP (Based on Unicode 6.0)
- [1401](https://en.wikipedia.org/w/index.php?title=Code_page_1401&action=edit&redlink=1) – ISO 10646 UCS-SMP (Based on Unicode 6.0)
- [1402](https://en.wikipedia.org/w/index.php?title=Code_page_1402&action=edit&redlink=1) – ISO 10646 UCS-SIP (Based on Unicode 6.0)
- [1414](https://en.wikipedia.org/w/index.php?title=Code_page_1414&action=edit&redlink=1) – ISO 10646 UCS-SSP (Based on Unicode 4.0)
- [1445](https://en.wikipedia.org/w/index.php?title=Code_page_1445&action=edit&redlink=1) – IBM AFP PUA No. 1
- [1446](https://en.wikipedia.org/w/index.php?title=Code_page_1446&action=edit&redlink=1) – ISO 10646 [UCS-PUP15](https://en.wikipedia.org/wiki/UCS-PUP15) (Based on Unicode 4.0)
- [1447](https://en.wikipedia.org/w/index.php?title=Code_page_1447&action=edit&redlink=1) – ISO 10646 [UCS-PUP16](https://en.wikipedia.org/wiki/UCS-PUP16) (Based on Unicode 4.0)
- [1448](https://en.wikipedia.org/w/index.php?title=Code_page_1448&action=edit&redlink=1) – UCS-BMP (Generic UDC)
- [1449](https://en.wikipedia.org/w/index.php?title=Code_page_1449&action=edit&redlink=1) – IBM default PUA

## Microsoft code pages

Main article: [Windows code page](https://en.wikipedia.org/wiki/Windows_code_page)

### Windows code pages

These code pages are used by Microsoft in its own Windows operating system. Microsoft defined [a number of code pages](https://en.wikipedia.org/wiki/Windows_code_pages) known as the ANSI code pages (as the first one, 1252 was based on an [apocryphal](https://en.wikipedia.org/wiki/Apocrypha) ANSI draft of what became [ISO 8859-1](https://en.wikipedia.org/wiki/ISO_8859-1)). Code page 1252 is built on ISO 8859-1 but uses the range 0x80-0x9F for extra printable characters rather than the C1 control codes used in ISO-8859-1. Some of the others are based in part on other parts of [ISO 8859](https://en.wikipedia.org/wiki/ISO_8859) but often rearranged to make them closer to 1252.

- [874](https://en.wikipedia.org/wiki/Code_page_1162) – Windows [Thai](https://en.wikipedia.org/wiki/Thai_script)
- [1250](https://en.wikipedia.org/wiki/Code_page_1250) – Windows [Central Europe](https://en.wikipedia.org/wiki/Central_Europe)
- [1251](https://en.wikipedia.org/wiki/Code_page_1251) – Windows [Cyrillic](https://en.wikipedia.org/wiki/Cyrillic_script)
- [1252](https://en.wikipedia.org/wiki/Code_page_1252) – Windows [Western](https://en.wikipedia.org/wiki/Western_Europe)
- [1253](https://en.wikipedia.org/wiki/Code_page_1253) – Windows [Greek](https://en.wikipedia.org/wiki/Greek_alphabet)
- [1254](https://en.wikipedia.org/wiki/Code_page_1254) – Windows [Turkish](https://en.wikipedia.org/wiki/Turkish_alphabet)
- [1255](https://en.wikipedia.org/wiki/Code_page_1255) – Windows [Hebrew](https://en.wikipedia.org/wiki/Hebrew_alphabet)
- [1256](https://en.wikipedia.org/wiki/Code_page_1256) – Windows [Arabic](https://en.wikipedia.org/wiki/Arabic_alphabet)
- [1257](https://en.wikipedia.org/wiki/Code_page_1257) – Windows [Baltic](https://en.wikipedia.org/wiki/Baltic_languages)
- [1258](https://en.wikipedia.org/wiki/Code_page_1258) – Windows [Vietnamese](https://en.wikipedia.org/wiki/Vietnamese_alphabet)

Microsoft recommends new applications use UTF-8 or UCS-2/UTF-16 instead of these code pages.

### DBCS code pages

These code pages represent [DBCS](https://en.wikipedia.org/wiki/DBCS) character encodings for various CJK languages. In Microsoft operating systems, these are used as both the "OEM" and "Windows" code page for the applicable locale.

- [932](https://en.wikipedia.org/wiki/Code_page_932_(Microsoft_Windows)) – Supports [Japanese](https://en.wikipedia.org/wiki/Japanese_writing_system) [Shift-JIS](https://en.wikipedia.org/wiki/Shift-JIS)
- [936](https://en.wikipedia.org/wiki/Code_page_936_(Microsoft_Windows)) – Supports [Simplified Chinese](https://en.wikipedia.org/wiki/Simplified_Chinese_characters) [GBK](https://en.wikipedia.org/wiki/GBK_(character_encoding))
- [949](https://en.wikipedia.org/wiki/Unified_Hangul_Code) – Supports [Korean](https://en.wikipedia.org/wiki/Hangul) Unified Hangul Code
- [950](https://en.wikipedia.org/wiki/Code_page_950) – Supports [Traditional Chinese](https://en.wikipedia.org/wiki/Traditional_Chinese_characters) [Big5](https://en.wikipedia.org/wiki/Big5)

### MS-DOS code pages[[edit](https://en.wikipedia.org/w/index.php?title=Code_page&action=edit&section=18)]

These code pages are used by Microsoft in its MS-DOS operating system. Microsoft refers to these as the OEM code pages because they were defined by the [OEMs](https://en.wikipedia.org/wiki/Original_equipment_manufacturer) who licensed MS-DOS for distribution with their hardware, not by Microsoft or a standards organization. Most of these code pages have the same number as the equivalent IBM code pages, although they are not **exactly** identical. There are minimum differences in some code pages from IBM and Microsoft.

- [708](https://en.wikipedia.org/wiki/Code_page_708) – Arabic (ASMO 708)
- [709](https://en.wikipedia.org/w/index.php?title=Code_page_709&action=edit&redlink=1) – Arabic ([ASMO 449+](https://en.wikipedia.org/wiki/Code_page_ASMO449%2B)/BCON V4)
- [710](https://en.wikipedia.org/w/index.php?title=Code_page_710&action=edit&redlink=1) – Arabic (Transparent Arabic)
- [720](https://en.wikipedia.org/wiki/Code_page_720) – Arabic (Transparent ASMO)
- [737](https://en.wikipedia.org/wiki/Code_page_737) – [Greek](https://en.wikipedia.org/wiki/Greek_language)
- [850](https://en.wikipedia.org/wiki/Code_page_850) – Latin-1
- [851](https://en.wikipedia.org/wiki/Code_page_851) – Greek
- [852](https://en.wikipedia.org/wiki/Code_page_852) – Latin-2
- [855](https://en.wikipedia.org/wiki/Code_page_855) – [Cyrillic](https://en.wikipedia.org/wiki/Cyrillic_script)
- [857](https://en.wikipedia.org/wiki/Code_page_857) – Latin-5
- [858](https://en.wikipedia.org/wiki/Code_page_858) – Latin-1 with [euro](https://en.wikipedia.org/wiki/Euro) symbol
- [859](https://en.wikipedia.org/wiki/Code_page_859) – Latin-9
- [860](https://en.wikipedia.org/wiki/Code_page_860) – [Portuguese](https://en.wikipedia.org/wiki/Portuguese_language)
- [861](https://en.wikipedia.org/wiki/Code_page_861) – [Icelandic](https://en.wikipedia.org/wiki/Icelandic_language)
- [862](https://en.wikipedia.org/wiki/Code_page_862) – [Hebrew](https://en.wikipedia.org/wiki/Hebrew_language)
- [863](https://en.wikipedia.org/wiki/Code_page_863) – [Canadian French](https://en.wikipedia.org/wiki/French_language)
- [864](https://en.wikipedia.org/wiki/Code_page_864) – [Arabic](https://en.wikipedia.org/wiki/Arabic_language)
- [865](https://en.wikipedia.org/wiki/Code_page_865) – [Danish](https://en.wikipedia.org/wiki/Danish_language)/[Norwegian](https://en.wikipedia.org/wiki/Norwegian_language)
- [866](https://en.wikipedia.org/wiki/Code_page_866) – Belarusian, Russian, Ukrainian
- [869](https://en.wikipedia.org/wiki/Code_page_869) – [Greek](https://en.wikipedia.org/wiki/Greek_alphabet)

### Macintosh emulation code pages

These code pages are used by Microsoft when emulating the Apple [Macintosh](https://en.wikipedia.org/wiki/Macintosh) character sets.

- [10000](https://en.wikipedia.org/wiki/Code_page_10000) - Apple [Macintosh Roman](https://en.wikipedia.org/wiki/Mac-Roman_encoding)
- [10001](https://en.wikipedia.org/wiki/Code_page_10001) - Apple Japanese
- [10002](https://en.wikipedia.org/w/index.php?title=Code_page_10002&action=edit&redlink=1) - Apple Traditional Chinese (Big5)
- [10003](https://en.wikipedia.org/w/index.php?title=Code_page_10003&action=edit&redlink=1) - Apple Korean
- [10004](https://en.wikipedia.org/wiki/Code_page_10004) - Apple [Arabic](https://en.wikipedia.org/wiki/MacArabic_encoding)
- [10005](https://en.wikipedia.org/w/index.php?title=Code_page_10005&action=edit&redlink=1) - Apple Hebrew
- [10006](https://en.wikipedia.org/wiki/Code_page_10006) - Apple [Greek](https://en.wikipedia.org/wiki/MacGreek_encoding)
- [10007](https://en.wikipedia.org/wiki/Code_page_10007) - Apple [Macintosh Cyrillic](https://en.wikipedia.org/wiki/MacCyrillic_encoding)
- [10008](https://en.wikipedia.org/w/index.php?title=Code_page_10008&action=edit&redlink=1) - Apple Simplified Chinese (GB 2312)
- [10010](https://en.wikipedia.org/wiki/Code_page_10010) - Apple [Romanian](https://en.wikipedia.org/wiki/MacRomanian_encoding)
- [10017](https://en.wikipedia.org/wiki/Code_page_10017) - Apple [Ukrainian](https://en.wikipedia.org/wiki/Macintosh_Ukrainian_encoding)
- [10021](https://en.wikipedia.org/w/index.php?title=Code_page_10021&action=edit&redlink=1) - Apple Thai
- [10029](https://en.wikipedia.org/wiki/Code_page_10029) - Apple [Macintosh Central Europe](https://en.wikipedia.org/wiki/Macintosh_Central_European_encoding)
- [10079](https://en.wikipedia.org/wiki/Code_page_10079) - Apple [Icelandic](https://en.wikipedia.org/wiki/Mac_Icelandic_encoding)
- [10081](https://en.wikipedia.org/wiki/Code_page_10081) - Apple [Turkish](https://en.wikipedia.org/wiki/MacTurkish_encoding)
- [10082](https://en.wikipedia.org/wiki/Code_page_10082) - Apple [Croatian](https://en.wikipedia.org/wiki/MacCroatian_encoding)

### Various other Microsoft code pages

The following code page numbers are specific to Microsoft Windows. IBM may use different numbers for these code pages. They emulate several character sets, namely those ones designed to be used accordingly to ISO, such as UNIX-like operating systems.

- [20000](https://en.wikipedia.org/w/index.php?title=Code_page_20000&action=edit&redlink=1) – Traditional Chinese CNS
- [20001](https://en.wikipedia.org/w/index.php?title=Code_page_20001&action=edit&redlink=1) – Traditional Chinese TCA
- [20002](https://en.wikipedia.org/w/index.php?title=Code_page_20002&action=edit&redlink=1) – Traditional Chinese ETEN
- [20003](https://en.wikipedia.org/w/index.php?title=Code_page_20003&action=edit&redlink=1) – Traditional Chinese IBM5500
- [20004](https://en.wikipedia.org/w/index.php?title=Code_page_20004&action=edit&redlink=1) – Traditional Chinese TeleText
- [20005](https://en.wikipedia.org/w/index.php?title=Code_page_20005&action=edit&redlink=1) – Traditional Chinese Wang
- [20105](https://en.wikipedia.org/wiki/Code_page_20105) – 7-bit [IA5](https://en.wikipedia.org/wiki/ITU_T.50) [IRV](https://en.wikipedia.org/wiki/ISO-646-IRV)
- [20106](https://en.wikipedia.org/wiki/Code_page_20106) – 7-bit [IA5](https://en.wikipedia.org/wiki/ITU_T.50) German (DIN 66003)
- [20107](https://en.wikipedia.org/w/index.php?title=Code_page_20107&action=edit&redlink=1) – 7-bit [IA5](https://en.wikipedia.org/wiki/ITU_T.50) Swedish (SEN 850200 C)
- [20108](https://en.wikipedia.org/w/index.php?title=Code_page_20108&action=edit&redlink=1) - 7-bit [IA5](https://en.wikipedia.org/wiki/ITU_T.50) Norwegian (NS 4551-2)
- [20127](https://en.wikipedia.org/wiki/Code_page_20127) – 7-bit [US-ASCII](https://en.wikipedia.org/wiki/US-ASCII)
- [20261](https://en.wikipedia.org/wiki/Code_page_20261) – [CCITT T.61](https://en.wikipedia.org/wiki/ITU_T.61)
- [20269](https://en.wikipedia.org/wiki/Code_page_20269) – [ISO 6937](https://en.wikipedia.org/wiki/ISO_6937)
- [20273](https://en.wikipedia.org/w/index.php?title=Code_page_20273&action=edit&redlink=1)
- [20277](https://en.wikipedia.org/w/index.php?title=Code_page_20277&action=edit&redlink=1)
- [20278](https://en.wikipedia.org/w/index.php?title=Code_page_20278&action=edit&redlink=1)
- [20284](https://en.wikipedia.org/w/index.php?title=Code_page_20284&action=edit&redlink=1)
- [20285](https://en.wikipedia.org/w/index.php?title=Code_page_20285&action=edit&redlink=1)
- [20290](https://en.wikipedia.org/w/index.php?title=Code_page_20290&action=edit&redlink=1)
- [20297](https://en.wikipedia.org/w/index.php?title=Code_page_20297&action=edit&redlink=1)
- [20420](https://en.wikipedia.org/w/index.php?title=Code_page_20420&action=edit&redlink=1)
- [20423](https://en.wikipedia.org/w/index.php?title=Code_page_20423&action=edit&redlink=1)
- [20424](https://en.wikipedia.org/w/index.php?title=Code_page_20424&action=edit&redlink=1)
- [20833](https://en.wikipedia.org/w/index.php?title=Code_page_20833&action=edit&redlink=1)
- [20838](https://en.wikipedia.org/w/index.php?title=Code_page_20838&action=edit&redlink=1)
- [20866](https://en.wikipedia.org/wiki/Code_page_20866) – [KOI8-R](https://en.wikipedia.org/wiki/KOI8-R)
- [20871](https://en.wikipedia.org/w/index.php?title=Code_page_20871&action=edit&redlink=1)
- [20880](https://en.wikipedia.org/w/index.php?title=Code_page_20880&action=edit&redlink=1)
- [20905](https://en.wikipedia.org/w/index.php?title=Code_page_20905&action=edit&redlink=1)
- [20924](https://en.wikipedia.org/w/index.php?title=Code_page_20924&action=edit&redlink=1)
- [20932](https://en.wikipedia.org/wiki/Code_page_20932)
- [20936](https://en.wikipedia.org/w/index.php?title=Code_page_20936&action=edit&redlink=1)
- [20949](https://en.wikipedia.org/w/index.php?title=Code_page_20949&action=edit&redlink=1)
- [21025](https://en.wikipedia.org/w/index.php?title=Code_page_21025&action=edit&redlink=1)
- [21027](https://en.wikipedia.org/w/index.php?title=Code_page_21027&action=edit&redlink=1)
- [21866](https://en.wikipedia.org/wiki/Code_page_21866) – [KOI8-U](https://en.wikipedia.org/wiki/KOI8-U)
- [28591](https://en.wikipedia.org/wiki/Code_page_28591) – [ISO-8859-1](https://en.wikipedia.org/wiki/ISO-8859-1)
- [28592](https://en.wikipedia.org/wiki/Code_page_28592) – [ISO-8859-2](https://en.wikipedia.org/wiki/ISO-8859-2)
- [28593](https://en.wikipedia.org/wiki/Code_page_28593) – [ISO-8859-3](https://en.wikipedia.org/wiki/ISO-8859-3)
- [28594](https://en.wikipedia.org/wiki/Code_page_28594) – [ISO-8859-4](https://en.wikipedia.org/wiki/ISO-8859-4)
- [28595](https://en.wikipedia.org/wiki/Code_page_28595) – [ISO-8859-5](https://en.wikipedia.org/wiki/ISO-8859-5)
- [28596](https://en.wikipedia.org/wiki/Code_page_28596) – [ISO-8859-6](https://en.wikipedia.org/wiki/ISO-8859-6)
- [28597](https://en.wikipedia.org/wiki/Code_page_28597) – [ISO-8859-7](https://en.wikipedia.org/wiki/ISO-8859-7)
- [28598](https://en.wikipedia.org/wiki/Code_page_28598) – [ISO-8859-8](https://en.wikipedia.org/wiki/ISO-8859-8)
- [28599](https://en.wikipedia.org/wiki/Code_page_28599) – [ISO-8859-9](https://en.wikipedia.org/wiki/ISO-8859-9)
- [28600](https://en.wikipedia.org/wiki/Code_page_28600) – [ISO-8859-10](https://en.wikipedia.org/wiki/ISO-8859-10)
- [28601](https://en.wikipedia.org/wiki/Code_page_28601) – [ISO-8859-11](https://en.wikipedia.org/wiki/ISO-8859-11)
- [28602](https://en.wikipedia.org/wiki/Code_page_28602) – not used (reserved for [ISO-8859-12](https://en.wikipedia.org/wiki/ISO-8859-12))
- [28603](https://en.wikipedia.org/wiki/Code_page_28603) – [ISO-8859-13](https://en.wikipedia.org/wiki/ISO-8859-13)
- [28604](https://en.wikipedia.org/wiki/Code_page_28604) – [ISO-8859-14](https://en.wikipedia.org/wiki/ISO-8859-14)
- [28605](https://en.wikipedia.org/wiki/Code_page_28605) – [ISO-8859-15](https://en.wikipedia.org/wiki/ISO-8859-15)
- [28606](https://en.wikipedia.org/wiki/Code_page_28606) – [ISO-8859-16](https://en.wikipedia.org/wiki/ISO-8859-16)
- [38596](https://en.wikipedia.org/wiki/Code_page_38596) – [ISO-8859-6](https://en.wikipedia.org/wiki/ISO-8859-6)
- [38598](https://en.wikipedia.org/wiki/Code_page_38598) – [ISO-8859-8](https://en.wikipedia.org/wiki/ISO-8859-8)

### Microsoft Unicode code pages

- [1200](https://en.wikipedia.org/wiki/Code_page_1200) – [UTF-16LE](https://en.wikipedia.org/wiki/UTF-16LE) Unicode ([little-endian](https://en.wikipedia.org/wiki/Little-endian))
- [1201](https://en.wikipedia.org/wiki/Code_page_1201) – [UTF-16BE](https://en.wikipedia.org/wiki/UTF-16BE) Unicode ([big-endian](https://en.wikipedia.org/wiki/Big-endian))
- [12000](https://en.wikipedia.org/wiki/Code_page_12000) – [UTF-32LE](https://en.wikipedia.org/wiki/UTF-32LE) Unicode ([little-endian](https://en.wikipedia.org/wiki/Little-endian))
- [12001](https://en.wikipedia.org/wiki/Code_page_12001) – [UTF-32BE](https://en.wikipedia.org/wiki/UTF-32BE) Unicode ([big-endian](https://en.wikipedia.org/wiki/Big-endian))
- [65000](https://en.wikipedia.org/wiki/Code_page_65000) – [UTF-7](https://en.wikipedia.org/wiki/UTF-7) Unicode
- [65001](https://en.wikipedia.org/wiki/Code_page_65001) – [UTF-8](https://en.wikipedia.org/wiki/UTF-8) Unicode