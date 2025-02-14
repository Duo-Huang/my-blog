---
title: ECMAScript 攻略大全
date: 2019-08-13 17:20:49
updated: 2024-09-10 17:20:49
tags:
  - ECMAScript
  - JavaScript
  - ES6
  - ES2015
categories:
  - 前端
  - 语言
keywords:
  - ECMAScript
  - JavaScript
  - ES6
  - ES2015 
description:
top_img:
comments:
cover: https://tc39.es/ecma262/img/ecma-logo.svg
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
abcjs:
---

> 作为前端开发工程师，**ES6** 这个词想必不陌生，**ECMAScript** 这个奇怪发音的名字应该也应该有所了解，你是否好奇过 **ECMA** 世界的神秘数字代号，**ECMA-262** 是什么，**ESxxx** 又是什么，**TC39** 是什么，**Stage 3** 、**Stage 4** 又意味着什么？你是否被层出不穷的 **ES20XX** 新特性所迷惑，需要掌握该特性到底是哪年推出的吗，这些提案在哪里能够看到，哪些已经可用，历年的 ES 标准去哪里查找？今天我来带大家揭开 ECMAScript 的神秘面纱，彻底理解掌握这些神秘代号，以及截止到 2024 年 ECMAScript 的特性。

另：祝贺[我国首个 JS 语言提案在 2021 年 4 月进入 Stage 3](https://tech.taobao.org/news/wdw4rc)，在 2021 年 11 月成功进入 Stage 4，并在 ECMAScript 2022 正式发布，成为事实上的标准，详见 [Error Cause](https://github.com/tc39/proposal-error-cause)。

> 2024 年 6 月 26 日，Ecma 国际通过了 [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) 第 15 版 —— ECMAScript® 2024 标准。



## ECMAScript 历史

我们首先来看 ECMA 是什么。**ECMA**，读音类似“艾克妈”，是**欧洲计算机制造商协会**（European Computer Manufacturers Association）的简称，是一家国际性会员制度的信息和电信标准组织。1994 年之后，由于组织的标准牵涉到很多其他国家，为了体现其国际性，更名为 [**Ecma 国际**](https://www.ecma-international.org/)（Ecma International），因此 Ecma 就不再是首字母缩略字了。

<p style="text-align: center;">
  <img style="width: 100%" src="https://tc39.es/ecma262/img/ecma-logo.svg" alt="Ecma International logo" />
</p>


了解了这段历史，为了技术写的专业性，如果文章中提到 Ecma 的时候，**可以写成 Ecma 或者 ecma，不要写成 ECMA**，除非是 ECMAScript 或 ECMA-XXX 这类专有名词。

1995 年，著名的网景公司（Netscape）的 [Brendan Eich](https://zh.wikipedia.org/wiki/%E5%B8%83%E8%98%AD%E7%99%BB%C2%B7%E8%89%BE%E5%85%8B) 开发了一种脚本语言，最初命名为 Mocha，后来改名为 LiveScript，最后为了蹭当时火热的 Java 热度重命名为了 JavaScript。

了解了 Ecma 国际和 JavaScript，就方便了解 ECMAScript 了，ECMAScript 是一种由 Ecma 国际在标准 ECMA-262 中定义的 [脚本语言](https://zh.wikipedia.org/wiki/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80) 规范。这种语言在往往被称为 [JavaScript](https://zh.wikipedia.org/wiki/JavaScript) 或 [JScript](https://zh.wikipedia.org/wiki/JScript) ，但实际上 JavaScript 和 JScript 是 ECMA-262 标准的实现和扩展。



## 神秘的 ECMA-262

上文提到了第一个神秘代码 **ECMA-262**，ECMA-262 到底是什么呢？原来 Ecma 国际的标准，都会以 Ecma-Number 命名，ECMA-262 就是 ECMA 262 号标准，具体就是**指 ECMAScript 遵照的标准**。1996 年 11 月，网景公司将 JavaScript 提交给 Ecma 国际进行标准化。ECMA-262 的第一个版本于 1997 年 6 月被 Ecma 国际采纳。

尽管 JavaScript 和 JScript 与 ECMAScript 兼容，但包含超出 ECMAScript 的功能。

我们如何查看最新最全的 Ecma 标准呢，可以查看 Ecma 国际官网的 [Standards](https://www.ecma-international.org/publications-and-standards/standards/)。截止到 2024 年 7 月，最新的 Ecma 标准已经到了 [ECMA-423](https://ecma-international.org/publications-and-standards/standards/ecma-423/)。

![ecma-standards](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/ecma-standards.png)

Ecma 标准涉及的类别非常多，官网因此提供了按照类别和最新修改排序的功能，我们来看看 ECMA-262 属于哪个类别：

![ecma-262](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/ecma-262.png)

**ECMA-262 属于“软件工程与接口”类别**，该类别一共有 17 个标准，详见上图。注意，ECMA-262 的最新更新日期是 2024 年 6 月，当前最新的标准就是 ES2024。



## 探秘 Ecma TC39 神秘组织

揭开了 Ecma-262 神秘面纱之后，我们来探秘一个代号名为 [TC39](https://www.ecma-international.org/technical-committees/tc39/) 的神秘组织。

![TC39](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/TC39.png)

其实官网解释的已经很清楚了，我用中文简要概括下：

TC39 是 Technical Committee 39 的简称，**是制定 ECMAScript 标准的委员会**，由各个主流浏览器厂商的代表构成，主席团三人分别来自 IBM、Bloomberg 和 Igalia，下设 5 个工作组（task group）：

- [TC39-TG1](https://www.ecma-international.org/task-groups/tc39-tg1/)（通用 ECMAScript® 语言，包括语法、语义、类库以及支持该语言的技术）
- [TC39-TG2](https://www.ecma-international.org/task-groups/tc39-tg2/)（ECMAScript® 国际化 API 标准）
- [TC39-TG3](https://ecma-international.org/task-groups/tc39-tg3/)（安全）
- [TC39-TG4](https://ecma-international.org/task-groups/tc39-tg4/)（Source map 标准）
- [TC39-TG5](https://ecma-international.org/task-groups/tc39-tg5/) （编程语言标准化实验）

我们经常会看到类似的新闻：XX 公司成为 Ecma TC39 成员。想要加入 TC39 会议，必须先成为 Ecma 会员：

![ecma-contribute-join](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/ecma-contribute-join.png)

那 Ecma 到底有哪些成员呢？[Ecma 官网](https://www.ecma-international.org/about-ecma/members/)给出了答案：

![ecma-members](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/ecma-members.png)

几大巨头赫然在列（恭喜华为荣升顶级会员）！看到这里，发现一共有 5 种类别，分别是 Ordinary members、Associate members、SME members、SPC members、NFP members，我们来看 Ordinary members 和 Associate members 的对比：

![ecma-member-diff](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/ecma-member-diff.png)

**Associate members 没有 Ecma 大会（General Assembly）的投票权**！在 Associate members 中，我国还有 3 家：阿里巴巴、字节跳动、360（对比 2021 年，新增字节跳动、减少了华为、腾讯）。

Wait，CHF 70000，这是 70000 法郎？Ecma 果然是欧洲豪门，顶级会员年费接近 50 万人民币。算了一下 Ecma 国际会员费收入每年就有 1,134,000 法郎，约 800 万人民币。

|     会员类别      | 年费(CHF) | 会员数量 | 总会费(CHF) |
| :---------------: | :-------: | :------: | :---------: |
| Ordinary members  |  70'000   |    6     |   420'000   |
| Associate members |  35'000   |    17    |   595'000   |
|    SME members    |  17'500   |    5     |   87'500    |
|    SPC members    |   3'500   |    9     |   31'500    |
|    NFP members    |     0     |    40    |      0      |

了解更多关于 TC39 的内容，可以探索其官网 [TC39 – Specifying JavaScript.](https://tc39.es/) 和 GitHub 仓库 [Ecma TC39 · GitHub](https://github.com/tc39)，**注意这个仓库很重要**。



## 我们熟悉的 ES6

探究完神秘的 ECMA-262 和 TC39 之后，我们缓口气，来看看我们最为熟悉的 ESX 家族。

上文提到 ECMAScript 是由 Ecma 国际在标准 ECMA-262 中定义的脚本语言规范。**到 2015 年，一共发布了 1、2、3、4、5、5.1、6 共 7 个版本**（其中 4 被废弃）。

我们常把 5.1 之前的 ECMAScript 版本统称做 **ES5**，将 6 版本之后的版本统称做 **ES6**（因为从 2015 年起，ECMAScript 终于步入正轨，每年发布一次版本，到了 2024 年，已经发布了 9 个版本了，实在太多，**所以用变革了 JavaScript 时代的 ES6 作为后续版本的代称**）。

划重点，Web 前端招聘的 JD 中，经常出现的 ES6，**不仅仅是 ES2015 这个版本，而是指代 ES2015 和其后每年发布的 ECMAScript 版本**。

从 ECMAScript 第 6 版开始，每年发布一个 ECMAScript 版本，因此 ECMAScript 版本有了很多名字，包括全名 ECMAScript 6、简写 ES6、年份命名 ECMAScript 2015、年份简写 ES2015。最常见的名字还是 ES6，之后推出的 ES7、ES8 等同理。**注意 ES6 之后的版本基本上按照年份简称，ES7、ES8 这种简称不常用。**



| 版本 | 版本全称       | 版本别称                        | 发布日期   | 简介                                                         |
| ---- | -------------- | ------------------------------- | ---------- | ------------------------------------------------------------ |
| 1    | ECMAScript 1   | ES1                             | 1997年6月  | 首版                                                         |
| 2    | ECMAScript 2   | ES2                             | 1998年6月  | 格式修正, 以使得其形式与ISO/IEC16262 国际标准一致            |
| 3    | ECMAScript 3   | ES3                             | 1999年12月 | 强大的正则表达式，更好的词法作用域链处理，新的控制指令，异常处理，错误定义更加明确，数据输出的格式化及其它改变 |
| 4    | ECMAScript 4   | ES4                             | 放弃       | 由于关于语言的复杂性出现分歧，第4版本被放弃，其中的部分成为了第5版本及 Harmony 的基础 |
| 5    | ECMAScript 5   | ES5                             | 2009年12月 | 新增“严格模式”，一个子集用作提供更彻底的错误检查，以避免结构出错。澄清了许多第3版本的模糊规范，并适应了与规范不一致的真实世界实现的行为。增加了部分新功能，如 getters 及 setters，支持JSON 以及在对象属性上更完整的反射. |
| 5.1  | ECMAScript 5.1 | ES5.1                           | 2011年6月  | ECMAScript 5.1 版形式上完全一致于国际标准ISO/IEC 16262:2011  |
| 6    | ECMAScript 6   | ES6 / ECMAScript 2015 / ES2015  | 2015年6月  | 第6版，添加了类和模块的语法，其他特性包括迭代器，生成器和生成器表达式，箭头函数，二进制数据，静态类型数组，集合，promise,reflection 和proxies。作为最早的 ECMAScript Harmony 版本，也被叫做 ES6 Harmony |
| 7    | ECMAScript 7   | ES7 / ECMAScript 2016 / ES2016  | 2016年6月  | 第7版，多个新的概念和语言特性                                |
| 8    | ECMAScript 8   | ES8 / ECMAScript 2017 / ES2017  | 2017年6月  | 第8版，多个新的概念和语言特性                                |
| 9    | ECMAScript 9   | ES9 / ECMAScript 2018 / ES2018  | 2018年6月  | 第9版，包含了异步循环，生成器，新的正则表达式特性和 rest/spread语法。 |
| 10   | ECMAScript 10  | ES10 / ECMAScript 2019 / ES2019 | 2019年6月  | 第10版                                                       |
| 11   | ECMAScript 11  | ES11 / ECMAScript 2020 / ES2020 | 2020年6月  | 第11版                                                       |
| 12   | ECMAScript 12  | ES12 / ECMAScript 2021 / ES2021 | 2021年6月  | 第12版                                                       |
| 13   | ECMAScript 13  | ES13 / ECMAScript 2022 / ES2022 | 2022年6月  | 第13版                                                       |
| 14   | ECMAScript 14  | ES14 / ECMAScript 2023 / ES2023 | 2023年6月  | 第14版                                                       |
| 15   | ECMAScript 15  | ES15 / ECMAScript 2024 / ES2024 | 2024年6月  | 第15版                                                       |

需要注意的是，自从 [TC39 进程](https://exploringjs.com/impatient-js/ch_history.html#tc39-process) 制定以来，ECMAScript 版本的重要性就降低了很多。大家不必记住某一个 ES 特性到底是哪年推出的。现在真正重要的是提案处于哪个阶段：**一旦提案到了第 4 阶段，那么它就可以使用了**。但是即使这样，你仍然需要检查你的引擎是否支持该功能。

这里又提到了一个 [TC39 进程](https://exploringjs.com/impatient-js/ch_history.html#tc39-process) 和阶段（Stage）的概念，我们接下来看看这两个概念是什么含义。



## TC39 进程和 Stage X

[TC39 进程](https://exploringjs.com/impatient-js/ch_history.html#tc39-process) 顾名思义，肯定是 TC39 组织发布的一个进程。随着 ECMAScript 6 的发布，当时的发布流程出现了两个明显的问题：

- 如果在两个 release 之间多次通过早已准备好的功能，势必在其 release 之前等待很长一段时间。而且功能准备如果很晚，会增加 deadline 之前匆忙赶工的风险。
- 很多功能在其实现和使用之前就花了很长时间在设计上，发现与实现和使用相关的设计缺陷会非常晚。

为了解决上述问题， TC39 建立了新的 TC39 进程：

- ECMAScript 功能设计与每年的 ECMAScript 版本发布独立，使用不同阶段（Stage）来区分功能的状态，共 5 个阶段，从 Stage 0（strawman）开始，到 Stage 4 （finished）结束。
- 越往后的阶段，需要原型实现和真机测试，可以建立设计和实现之间的反馈机制。
- ECMAScript 版本**每年发布一次**，发布的内容包含在 **release deadline** 之前的全部到达 **Stage 4** 的功能。

![TC39-stage](/cdn/gh/Duo-Huang/cdn/blog/img/post/2019-08-13/TC39-stage-flow.png)

- Stage 0：代号“稻草人（strawman）”，草案阶段
- Stage 1：代号“提案（proposal）”， TC39 帮助阶段
- Stage 2：代号“草案（draft）”， 本阶段很有可能成为标准
- Stage 3：代号“候选（candidate）”， 已完成，需要从实现中获得反馈
- Stage 4：代号“结束（finished）”， 准备成为标准

理解了 Stage 各阶段的含义，就能理解[我国首个 JS 语言提案在 ECMA 进入 Stage 3](https://tech.taobao.org/news/wdw4rc)这个新闻的意义了。

如何查看各阶段的提案呢？可以查阅 [GitHub - tc39/ecma262: Status, process, and documents for ECMA-262](https://github.com/tc39/ecma262/) 这个 repo。



## 历届 ES 特性全收录 ES2016 - ES2024

网上有太多零散的 ES 特性总结，很多同学想知道，**有官方的 ECMAScript 功能列表吗**？

当然有，TC39 仓库列出了 [已完成提案](https://github.com/tc39/proposals/blob/master/finished-proposals.md) 以及它们的版本。

9 年过去了，新增的 ES 功能，截至 2024 年 7 月 08 日，包括草案的功能，**一共 60 个**（较 2022 年新增 13 个）：

### ES2016

- [Array.prototype.includes](https://github.com/tc39/proposal-Array.prototype.includes)
  - 作者：Domenic Denicola
  - 维护者：Domenic Denicola、Rick Waldron
  - TC39 会议记录： [November 2015](https://github.com/tc39/notes/blob/master/meetings/2015-11/nov-17.md#arrayprototypeincludes)
  - 发布时间：2016
- [Exponentiation operator](https://github.com/tc39/proposal-exponentiation-operator)
  - 作者：Rick Waldron
  - 维护者：Rick Waldron
  - TC39 会议记录： [January 2016](https://github.com/tc39/notes/blob/master/meetings/2016-01/jan-28.md#5xviii-exponentiation-operator-rw)
  - 发布时间：2016

### ES2017

- [Object.values/Object.entr…](https://github.com/tc39/proposal-object-values-entries)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband
  - TC39 会议记录： [March 2016](https://github.com/tc39/notes/blob/master/meetings/2016-03/march-29.md#objectvalues--objectentries)
  - 发布时间：2017
- [String padding](https://github.com/tc39/proposal-string-pad-start-end)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband、Rick Waldron
  - TC39 会议记录： [May 2016](https://github.com/tc39/notes/blob/master/meetings/2016-05/may-25.md#stringprototypepadstartend-jhd)
  - 发布时间：2017
- [Object.getOwnPropertyDescriptors](https://github.com/tc39/proposal-object-getownpropertydescriptors)
  - 作者：Jordan Harband、Andrea Giammarchi
  - 维护者：Jordan Harband、Andrea Giammarchi
  - TC39 会议记录：[May 2016](https://github.com/tc39/notes/blob/master/meetings/2016-05/may-25.md#objectgetownpropertydescriptors-jhd)
  - 发布时间：2017
- [Trailing commas in function parameter lists and calls](https://github.com/tc39/proposal-trailing-function-commas)
  - 作者：Jeff Morrison
  - 维护者：Jeff Morrison
  - TC39 会议记录： [July 2016](https://github.com/tc39/notes/blob/master/meetings/2016-07/jul-26.md#9ie-trailing-commas-in-functions)
  - 发布时间：2017
- [Async functions](https://github.com/tc39/proposal-async-await)
  - 作者：Brian Terlson
  - 维护者：Brian Terlson
  - TC39 会议记录：[July 2016](https://github.com/tc39/notes/blob/master/meetings/2016-07/jul-28.md#10iv-async-functions)
  - 发布时间：2017
- [Shared memory and atomics](https://github.com/tc39/ecmascript_sharedmem)
  - 作者：Lars T Hansen
  - 维护者：Lars T Hansen
  - TC39 会议记录： [January 2017](https://github.com/tc39/notes/blob/master/meetings/2017-01/jan-24.md#13if-seeking-stage-4-for-sharedarraybuffer)
  - 发布时间：2017

### ES2018

- [Lifting template literal restriction](https://github.com/tc39/proposal-template-literal-revision)
  - 作者：Tim Disney
  - 维护者：Tim Disney
  - TC39 会议记录： [March 2017](https://github.com/tc39/notes/blob/master/meetings/2017-03/mar-21.md#10ia-template-literal-updates)
  - 发布时间：2018
- [s (dotAll) flag for regular expressions](https://github.com/tc39/proposal-regexp-dotall-flag)
  - 作者：Mathias Bynens
  - 维护者：Brian Terlson、Mathias Bynens
  - TC39 会议记录： [November 2017](https://github.com/tc39/notes/blob/master/meetings/2017-11/nov-28.md#9ie-regexp-dotall-status-update)
  - 发布时间：2018
- [RegExp named capture groups](https://github.com/tc39/proposal-regexp-named-groups)
  - 作者：Gorkem Yakin、Daniel Ehrenberg
  - 维护者：Daniel Ehrenberg、Brian Terlson、Mathias Bynens
  - TC39 会议记录： [November 2017](https://github.com/tc39/notes/blob/master/meetings/2017-11/nov-28.md#9if-regexp-named-captures-status-update)
  - 发布时间：2018
- [Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread)
  - 作者：Sebastian Markbåge
  - 维护者：Sebastian Markbåge
  - TC39 会议记录： [January 2018](https://github.com/tc39/notes/blob/master/meetings/2018-01/jan-23.md#restspread-properties-for-stage-4)
  - 发布时间：2018
- [RegExp Lookbehind Assertions](https://github.com/tc39/proposal-regexp-lookbehind)
  - 作者：Gorkem Yakin、Nozomu Katō、Daniel Ehrenberg
  - 维护者：Daniel Ehrenberg、Mathias Bynens
  - TC39 会议记录： [January 2018](https://github.com/tc39/notes/blob/master/meetings/2018-01/jan-23.md#conclusionresolution-16)
  - 发布时间：2018
- [RegExp Unicode Property Escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes)
  - 作者：Mathias Bynens
  - 维护者：Brian Terlson、Daniel Ehrenberg、Mathias Bynens
  - TC39 会议记录： [January 2018](https://github.com/tc39/notes/blob/master/meetings/2018-01/jan-24.md#conclusionresolution-1)
  - 发布时间：2018
- [Promise.prototype.finally](https://github.com/tc39/proposal-promise-finally)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband
  - TC39 会议记录 ：[January 2018](https://github.com/tc39/notes/blob/master/meetings/2018-01/jan-24.md#conclusionresolution-2)
  - 发布时间：2018
- [Asynchronous Iteration](https://github.com/tc39/proposal-async-iteration)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband
  - TC39 会议记录 ：[January 2018](https://github.com/tc39/notes/blob/master/meetings/2018-01/jan-24.md#conclusionresolution-2)
  - 发布时间：2018

### ES2019

- [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)
  - 作者：Michael Ficarra
  - 维护者：Michael Ficarra
  - TC39 会议记录 ： [May 2018](https://github.com/tc39/notes/blob/master/meetings/2018-05/may-22.md#conclusionresolution-7)
  - 发布时间：2019
- [JSON superset](https://github.com/tc39/proposal-json-superset)
  - 作者：Richard Gibson
  - 维护者：Mark Miller、Mathias Bynens
  - TC39 会议记录： [May 2018](https://github.com/tc39/notes/blob/master/meetings/2018-05/may-22.md#conclusionresolution-8)
  - 发布时间：2019
- [Symbol.prototype.description](https://github.com/tc39/proposal-Symbol-description)
  - 作者：Michael Ficarra
  - 维护者：Michael Ficarra
  - TC39 会议记录： [November 2018](https://github.com/tc39/notes/blob/master/meetings/2018-11/nov-27.md#conclusionresolution-12)
  - 发布时间：2019
- [Function.prototype.toString revision](https://github.com/tc39/Function-prototype-toString-revision)
  - 作者：Michael Ficarra
  - 维护者：Michael Ficarra
  - TC39 会议记录：[November 2018](https://github.com/tc39/notes/blob/master/meetings/2018-11/nov-27.md#conclusionresolution-13)
  - 发布时间：2019
- [Object.fromEntries](https://github.com/tc39/proposal-object-from-entries)
  - 作者：Darien Maillet Valentine
  - 维护者：Jordan Harband、Kevin Gibbons
  - TC39 会议记录：[January 2019](https://github.com/tc39/notes/blob/master/meetings/2019-01/jan-29.md#objectfromentries-for-stage-4)
  - 发布时间：2019
- [Well-formed JSON.stringify](https://github.com/tc39/proposal-well-formed-stringify)
  - 作者：Richard Gibson
  - 维护者：Mathias Bynens
  - TC39 会议记录： [January 2019](https://github.com/tc39/notes/blob/master/meetings/2019-01/jan-29.md#well-formed-jsonstringify-for-stage-4)
  - 发布时间：2019
- [String.prototype.{trimStart,trimEnd}](https://github.com/tc39/proposal-string-left-right-trim)
  - 作者：Sebastian Markbåge
  - 维护者：Sebastian Markbåge、Mathias Bynens
  - TC39 会议记录： [January 2019](https://github.com/tc39/notes/blob/master/meetings/2019-01/jan-29.md#stringprototypetrimstarttrimend-for-stage-4)
  - 发布时间：2019
- [Array.prototype.{flat,flatMap}](https://github.com/tc39/proposal-flatMap)
  - 作者：Brian Terlson、Michael Ficarra、Mathias Bynens
  - 维护者：Brian Terlson、Michael Ficarra
  - TC39 会议记录： [January 2019](https://github.com/tc39/notes/blob/master/meetings/2019-01/jan-29.md#arrayprototypeflatflatmap-for-stage-4)
  - 发布时间：2019

### ES2020

- [String.prototype.matchAll](https://github.com/tc39/proposal-string-matchall)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband
  - TC39 会议记录： [March 2019](https://github.com/tc39/notes/blob/master/meetings/2019-03/mar-26.md#stringprototypematchall-for-stage-4)
  - 发布时间：2020
- [BigInt](https://github.com/tc39/proposal-bigint)
  - 作者：Daniel Ehrenberg
  - 维护者：Daniel Ehrenberg
  - TC39 会议记录： [June 2019](https://github.com/tc39/notes/blob/master/meetings/2019-06/june-4.md#bigint-to-stage-4)
  - 发布时间：2020
- [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled)
  - 作者：Jason Williams、Robert Pamely、Mathias Bynens
  - 维护者：Mathias Bynens
  - TC39 会议记录： [July 2019](https://github.com/tc39/notes/blob/master/meetings/2019-07/july-24.md#promiseallsettled)
  - 发布时间：2020
- [globalThis](https://github.com/tc39/proposal-global)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband
  - TC39 会议记录： [October 2019](https://github.com/tc39/notes/blob/master/meetings/2019-10/october-1.md#globalthis-to-stage-4)
  - 发布时间：2020
- [for-in mechanics](https://github.com/tc39/proposal-for-in-order)
  - 作者：Kevin Gibbons
  - 维护者：Kevin Gibbons
  - TC39 会议记录： [December 2019](https://github.com/tc39/notes/blob/master/meetings/2019-12/december-4.md#for-in-order-for-stage-4)
  - 发布时间：2020
- [Optional Chaining](https://github.com/tc39/proposal-optional-chaining)
  - 作者：Gabriel Isenberg、Claude Pache、Dustin Savery
  - 维护者：Gabriel Isenberg、Dustin Savery、Justin Ridgewell、Daniel Rosenwasser
  - TC39 会议记录： [December 2019](https://github.com/tc39/notes/blob/master/meetings/2019-12/december-4.md#optional-chaining-for-stage-4)
  - 发布时间：2020
- [Nullish coalescing Operator](https://github.com/tc39/proposal-nullish-coalescing)
  - 作者：Gabriel Isenberg
  - 维护者：Gabriel Isenberg、Justin Ridgewell、Daniel Rosenwasser
  - TC39 会议记录：[December 2019](https://github.com/tc39/notes/blob/master/meetings/2019-12/december-4.md#nullish-coalescing-for-stage-4)
  - 发布时间：2020
- [import.meta](https://github.com/tc39/proposal-import-meta)
  - 作者：Domenic Denicola
  - 维护者：Gus Caplan
  - TC39 会议记录： [March 2020](https://github.com/tc39/notes/blob/master/meetings/2020-03/april-1.md#importmeta-for-stage-4-continued-from-previous-day)
  - 发布时间：2020

### ES2021

- [String.prototype.replaceAll](https://github.com/tc39/proposal-string-replaceall)
  - 作者：Peter Marshall、Jakob Gruber、Mathias Bynens
  - 维护者：Mathias Bynens
  - TC39 会议记录： [June 2020](https://github.com/tc39/notes/blob/master/meetings/2020-06/june-2.md#stringprototypereplaceall-for-stage-4)
  - 发布时间：2021
- [Promise.any](https://github.com/tc39/proposal-promise-any)
  - 作者：Mathias Bynens、Kevin Gibbons、Sergey Rubanov
  - 维护者：Mathias Bynens
  - TC39 会议记录： [July 2020](https://github.com/tc39/notes/blob/master/meetings/2020-07/july-21.md#promiseany--aggregateerror-for-stage-4)
  - 发布时间：2021
- [WeakRefs](https://github.com/tc39/proposal-weakrefs)
  - 作者：Dean Tribble、Sathya Gunasekaran
  - 维护者：Dean Tribble、Mark Miller、Till Schneidereit、Sathya Gunasekaran、Daniel Ehrenberg
  - TC39 会议记录： [July 2020](https://github.com/tc39/notes/blob/master/meetings/2020-07/july-21.md#weakrefs-for-stage-4--cleanupsome-for-stage-23)
  - 发布时间：2021
- [Logical Assignment Operators](https://github.com/tc39/proposal-logical-assignment)
  - 作者：Justin Ridgewell
  - 维护者：Justin Ridgewell、Hemanth HM
  - TC39 会议记录： [July 2020](https://github.com/tc39/notes/blob/master/meetings/2020-07/july-21.md#logical-assignment-for-stage-4)
  - 发布时间：2021
- [Numeric separators](https://github.com/tc39/proposal-numeric-separator)
  - 作者：Sam Goto、Rick Waldron
  - 维护者：Sam Goto、Rick Waldron、Leo Balter
  - TC39 会议记录： [July 2020](https://github.com/tc39/notes/blob/master/meetings/2020-07/july-21.md#numericliteralseparator-for-stage-4)
  - 发布时间：2021

### ES2022

- Class Fields ( [Private instance methods and accessors](https://github.com/tc39/proposal-private-methods) , [Class Public Instance Fields & Private Instance Fields](https://github.com/tc39/proposal-class-fields) , [Static class fields and private static methods](https://github.com/tc39/proposal-static-class-features) )
  - 作者：Daniel Ehrenberg
  - 维护者：Daniel Ehrenberg、Kevin Gibbons
  - TC39 会议记录：[April 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-04/apr-19.md#class-fields-private-methods-and-static-class-features-for-stage-4)
  - 发布时间：2022
- [RegExp Match Indices](https://github.com/tc39/proposal-regexp-match-indices)
  - 作者：Ron Buckton
  - 维护者：Ron Buckton
  - TC39 会议记录：[May 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-05/may-25.md#regexp-match-indices)
  - 发布时间：2022
- [Top-level `await`](https://github.com/tc39/proposal-top-level-await)
  - 作者：Myles Borins、Yulia Startsev、Daniel Ehrenberg、Guy Bedford、Ms2ger
  - 维护者：Myles Borins、Yulia Startsev
  - TC39 会议记录：[May 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-05/may-25.md#top-level-await)
  - 发布时间：2022
- [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in)
  - 作者：Jordan Harband
  - 维护者：Jordan Harband
  - TC39 会议记录：[July 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-07/july-14.md#ergonomic-brand-checks-for-stage-4)
  - 发布时间：2022
- [`.at()`](https://github.com/tc39/proposal-relative-indexing-method)
  - 作者：Shu-yu Guo、Tab Atkins
  - 维护者：Shu-yu Guo、Tab Atkins
  - TC39 会议记录：[August 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-08/aug-31.md#relative-indexing-at-method-for-stage-4)
  - 发布时间：2022
- [Accessible `Object.prototype.hasOwnProperty`](https://github.com/tc39/proposal-accessible-object-hasownproperty)
  - 作者：Jamie Kyle
  - 维护者：Tierney Cyren、Jamie Kyle
  - TC39 会议记录：[August 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-08/aug-31.md#accessible-object-hasownproperty-for-stage-4)
  - 发布时间：2022
- [Class Static Block](https://github.com/tc39/proposal-class-static-block)
  - 作者：Ron Buckton
  - 维护者：Ron Buckton
  - TC39 会议记录：[August 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-08/aug-31.md#class-static-initialization-blocks-for-stage-4)
  - 发布时间：2022
- [Error Cause](https://github.com/tc39/proposal-error-cause)
  - 作者：Chengzhong Wu
  - 维护者：Chengzhong Wu、Hemanth HM
  - TC39 会议记录：[October 2021](https://github.com/tc39/notes/blob/HEAD/meetings/2021-10/oct-26.md#error-cause-for-stage-4)
  - 发布时间：2022

### ES2023

- [Array find from last](https://github.com/tc39/proposal-array-find-from-last)
  - 作者：Wenlu Wang
  - 维护者：Wenlu Wang、Daniel Rosenwasser
  - TC39 会议记录：[June 2022](https://github.com/tc39/notes/blob/HEAD/meetings/2022-06/jun-06.md#findlastfindlastindex-for-stage-4)
  - 发布时间：2023
- [Hashbang Grammar](https://github.com/tc39/proposal-hashbang)
  - 作者：Bradley Farias
  - 维护者：Bradley Farias
  - TC39 会议记录：July 2022
  - 发布时间：2023
- [Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)
  - 作者：Daniel Ehrenberg、Richard Button、Robin Ricard、Leo Balter、Rick Waldron、Caridy Patiño
  - 维护者：Daniel Ehrenberg、Richard Button、Robin Ricard、Leo Balter、Rick Waldron、Caridy Patiño
  - TC39 会议记录：[January 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-01/jan-30.md#symbols-as-weakmap-keys)
  - 发布时间：2023
- [Change Array by Copy](https://github.com/tc39/proposal-change-array-by-copy)
  - 作者：Ashley Claymore、Robin Ricard
  - 维护者：Ashley Claymore、Robin Ricard
  - TC39 会议记录：March 2022
  - 发布时间：2023

### ES2024

- [Well-Formed Unicode Strings](https://github.com/tc39/proposal-is-usv-string)

  - 作者：Guy Bedford、Bradley Farias
  - 维护者：Guy Bedford、Bradley Farias、Michael Ficarra
  - TC39 会议记录：[May 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-05/may-15.md#well-formed-unicode-strings-for-stage-4)
  - 发布时间：2024

- [`Atomics.waitAsync`](https://github.com/tc39/proposal-atomics-wait-async)

  - 作者：Lars Hansen
  - 维护者：Shu-yu Guo、Lars Hansen
  - TC39 会议记录：[May 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-05/may-15.md#atomicswaitasync-for-stage-4)
  - 发布时间：2024

- [RegExp v flag with set notation + properties of strings](https://github.com/tc39/proposal-regexp-v-flag)

  - 作者：Markus Scherer、Mathias Bynens
  - 维护者：Mathias Bynens
  - TC39 会议记录：[May 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-05/may-16.md#regexp-v-flag-for-stage-4)
  - 发布时间：2024

- [Resizable and growable ArrayBuffers](https://github.com/tc39/proposal-resizablearraybuffer)

  - 作者：Shu-yu Guo
  - 维护者：Shu-yu Guo
  - TC39 会议记录：[September 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-09/september-26.md#resizable-buffers-for-stage-4)
  - 发布时间：2024

- [Array Grouping](https://github.com/tc39/proposal-array-grouping)

  - 作者：Justin Ridgewell
  - 维护者：Justin Ridgewell、Jordan Harband
  - TC39 会议记录：[November 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-11/november-27.md#array-grouping-for-stage-4)
  - 发布时间：2024

- [`Promise.withResolvers`](https://github.com/tc39/proposal-promise-with-resolvers)

  - 作者：Peter Klecha
  - 维护者：Peter Klecha
  - TC39 会议记录：[November 2023](https://github.com/tc39/notes/blob/HEAD/meetings/2023-11/november-27.md#promisewithresolvers-for-stage-4)
  - 发布时间：2024

- [ArrayBuffer transfer](https://github.com/tc39/proposal-arraybuffer-transfer)

  - 作者：Shu-yu Guo、Jordan Harband、Yagiz Nizipli
  - 维护者：Shu-yu Guo、Jordan Harband、Yagiz Nizipli
  - TC39 会议记录：[February 2024](https://github.com/tc39/notes/blob/HEAD/meetings/2024-02/feb-6.md#arraybuffer-transfer-for-stage-4)
  - 发布时间：2024

- ### ES2025

  未发布，目前有 2 个提案已进入 stage 4：

  - [Duplicate named capture groups](https://github.com/tc39/proposal-duplicate-named-capturing-groups)
    - 作者：Kevin Gibbons
    - 维护者：Kevin Gibbons
    - TC39 会议记录：[April 2024](https://github.com/tc39/notes/blob/HEAD/meetings/2024-04/april-08.md#duplicate-named-capture-groups-for-stage-4)
    - 预计发布时间：2025
  - [New Set methods](https://github.com/tc39/proposal-set-methods)
    - 作者：Michał Wadas、Sathya Gunasekaran、Kevin Gibbons
    - 维护者：Kevin Gibbons
    - TC39 会议记录：[April 2024](https://github.com/tc39/notes/blob/HEAD/meetings/2024-04/april-08.md#set-methods-for-stage-4)
    - 预计发布时间：2025

## 参考资料

- [Ecma国际 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Ecma%E5%9B%BD%E9%99%85)
- [History and evolution of JavaScript](https://exploringjs.com/impatient-js/ch_history.html)