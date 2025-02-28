---
title: ES6中的迭代器与生成器
date: 2020-03-26 14:48:25
updated:
tags:
  - ECMAScript
  - JavaScript
  - ES6
  - ES2015
  - Iterator
  - Generator
categories:
  - 语言
  - JavaScript
keywords:
  - ECMAScript
  - JavaScript
  - ES6
  - ES2015
  - Iterator
  - Generator
description:
top_img:
comments:
cover:
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

## 前言

JS 提供了很多迭代集合的方法，从简单的`for`循环到`map()`、`filter()`等方法。ES6 规范还新增了两个高级特性：迭代器和生成器，并且还新增了`for...of...`结构支持这两个特性。使用这两个特性，能够更清晰、高效、方便地实现迭代。

## 什么是迭代

在 JS 中循环是迭代机制的基础，这是因为循环可以设置迭代的次数，同时还可以指定每次迭代的具体操作。每次循环都会在下一次迭代之前就完成，并且迭代的顺序事先就定义好了。

迭代会在一个**有序集合**上进行。这里的有序，可以理解为集合中所有项都可以按照既定的顺序被遍历到，特别是开始和结束项有明确的定义。

### 区分 for of 和 for in

for of 是遍历迭代器的，可遍历的对象是一个含有迭代器的对象，一般定义的 object 是没有自带迭代协议的也就是`@@iterator`方法,后面详细讲解此属性，Array、string、map 等类型自带有这个属性，也就是本身就是可以被迭代的对象。

for in 是遍历可枚举属性的，基本包装类型如 Object，Array，Object 的**原型属性是不可以被枚举的**，也就是说必须要自己定义的属性才可以被枚举，是否可以被枚举 通过`Object.defineProperty()`方法追加可枚举属性`enumerable: true

## 迭代器模式

迭代器模式描述了一个方案，即可以把有些结构称为“可迭代对象”（iterable），因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 进行消费。

可迭代对象是一种抽象的说法。基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象。它们包含的元素都是有限的，而且都具有无歧义的遍历顺序。

任何实现 Iterable 接口的数据结构都可以被实现 Iterator 接口的结构“消费”（consume）。**迭代器**（iterator）是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的 API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。这种概念上的分离正是 Iterable 和 Iterator 的强大之处

### 可迭代协议

可迭代协议允许 JS 对象定义或定制它们的迭代行为。要成为**可迭代对象**， 一个对象必须实现 `@@iterator` 方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 `Symbol.iterator`访问该属性。这个`Symbol.iterator`必须返回一个迭代器工厂函数（或者是生成器函数），调用这个函数返回一个新的迭代器（iterator）对象。

当一个对象需要被迭代的时候（比如被置入一个 `for...of`循环时），首先，会不带参数调用它的 `Symbol.iterator` 方法，然后通过此方法返回的**迭代器**获得要迭代的值。

值得注意的是调用此函数时，它将作为对可迭代对象的方法进行调用。 因此，`Symbol.iterator`在函数内部，`this`关键字可用于访问可迭代对象的属性，以决定在迭代过程中提供什么。可以将相关属性放到返回的迭代器对象内进行操作。

很多内置类型都实现了 Iterator 接口`Symbol.iterator`字符串、数组、映射、集合、arguments。可以通过访问`Symbol.iterator`属性检查是否包含默认的迭代器工厂函数。

实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。**实现可迭代协议**的所有类型都会自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括： `for-of` 循环、数组解构、扩展操作符、`Array.from()`、创建集合、创建映射、`Promise.all()`接收由期约组成的可迭代对象、`Promise.race()`接收由期约组成的可迭代对象、`yield*`操作符，在生成器中使用。这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器。

接下来通过一个简单的数组，演示一下这些原生语言特性。

```js
const arr = [1, 2, 3, 4, 5];

//for...of.. 输出1, 2, 3, 4, 5
for (let i of arr) {
  console.log(i);
}

//数组解构
const [a, b, c] = arr;
console.log(a, b, c); //1, 2, 3

//扩展操作符
console.log(...arr); // 1, 2, 3, 4, 5

//Array.from()
const temp = Array.from(arr);
console.log(temp); // [1, 2, 3, 4, 5]
```

### 迭代器协议

**迭代器协议**定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。只有实现了`next()`方法，一个对象才能成为迭代器。

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 `next()`方法在可迭代对象中遍历数据。每次成功调用 `next()`，都会返回一个 IteratorResult 对象，其中包含迭代器返回的下一个值。若不调用 `next()`，则无法知道迭代器的当前位置。

`next()`方法返回的迭代器对象 IteratorResult 包含两个属性：`done` 和 `value`。`done` 是一个布尔值，表示是否还可以再次调用 `next()`取得下一个值；`value` 包含可迭代对象的下一个值（`done:false`），或者 `undefined`（`done:true`）。`done: true` 状态称为“耗尽”。

下面通过一个数组来理解一下迭代器的特性。

```js
const arr = [1, 2];
const iter1 = arr[Symbol.iterator]();
const iter2 = arr[Symbol.iterator]();

console.log(iter1.next()); // {value:1, done:false}
console.log(iter1.next()); // {value:2, done:false}
console.log(iter1.next()); // {value:undefined, done:true}
console.log(iter1.next()); // {value:undefined, done:true}

console.log(iter2.next()); // {value:1, done:false}
```

这里通过迭代器调用`next()`对数组进行迭代，迭代完成后，再调用`next()`只会一直返回`{value:undefined, done:true}`。这里还会发现，每个迭代器都是单独的实例，迭代器之间互不干扰。

迭代器保存的是对迭代对象的引用，因此对数组进行操作在迭代器迭代时也会相应的变化，前提是迭代器没有关闭（`done:true`）。

### 自定义迭代器

与 Iterable 接口类似，任何实现 Iterator 接口的对象都可以作为迭代器使用。

```js
const obj = {
  arr: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    //迭代器的结构，下文会提到。此处暂不说明
    return {
      arr: this.arr,
      next() {
        if (index < 5) {
          return {
            value: this.arr[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  },
};
//for...of.. 输出1, 2, 3, 4, 5
for (let i of obj) {
  console.log(i);
}

//数组解构
const [a, b, c] = obj;
console.log(a, b, c); //1, 2, 3

//扩展操作符
console.log(...obj); // 1, 2, 3, 4, 5

//Array.from()
const arr = Array.from(obj);
console.log(arr); // [1, 2, 3, 4, 5]
```

### 提前终止迭代器

可选的`return()`方法用于指定在迭代器提前关闭时执行的逻辑。执行迭代的结构在想让迭代器知道它不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器。可能的情况包括：

- `for...of` 循环通过 `break`、`return` 或 `throw` 提前退出；
- 解构操作并未消费所有值。

`return()`方法必须返回一个有效的 IteratorResult 对象。如下面代码所示，内置语言结构在发现还有更多可迭代内容，但是不会消费这些内容时，会自动调用`return()`方法。

```js
const obj = {
  arr: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    //迭代器的结构，下文会提到。此处暂不说明
    return {
      arr: this.arr,
      next() {
        if (index < 5) {
          return {
            value: this.arr[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
      return() {
        console.log("return function");
        return {
          value: "return function",
          done: true,
        };
      },
    };
  },
};

for (let i of obj) {
  console.log(i);
  if (i == 2) break;
}
//输出
// 1
// 2
// return function
```

如果迭代器没有关闭，那么还可以继续进行迭代。如，数组就是无法关闭的。

```js
const arr = [1, 2, 3, 4, 5];
const iter = arr[Symbol.iterator]();

for (let i of iter) {
  console.log(i);
  if (i == 2) break;
}
//输出
// 1
// 2
// return function

for (let i of iter) {
  console.log(i);
}
//输出
// 3
// 4
// 5
```

因为`return()`方法是可选的，所以并非所有迭代器都是可关闭的。要知道某个迭代器是否可关闭， 可以测试这个迭代器实例的 `return` 属性是不是函数对象。不过，仅仅给一个不可关闭的迭代器增加这个方法并不能让它变成可关闭的。这是因为调用 `return()`不会强制迭代器进入关闭状态。即便如此，`return()`方法还是会被调用。

## 生成器

生成器是 ES6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。

### 生成器基础

生成器的形式是一个函数，需要在函数声明时在`function`关键字后加上一个星号（∗\*∗），以表明此函数为生成器。但是要注意的是箭头函数不能作为生成器函数。

生成器函数的作用是产生一个生成器对象。生成器对象一开始处于暂停执行的状态。与迭代器相似，生成器对象也实现了 Iterator 接口（**这也意味着生成器对象可以作为迭代器进行使用**），也具有 `next()`方法。调用这个方法会让生成器对象开始或恢复执行。

```js
function* fn() {
  return "finish";
}
const obj = fn(); // 生成器对象暂停
console.log(obj.next()); // 生成器对象开启执行 {value:'finish', done:true}
```

与迭代器一样，生成器对象的`next()`方法返回的对象，同样拥有两个属性`value`和`done`。当`done：true`时，`value`的值为生成器函数的返回值，没有返回值则为`undefined`。同样的，若`done：true`，那么之后再执行`next()`方法，得到也一直时同一个对象。

### 通过`yield`中断执行

`yield`关键字可以让生成器停止和开始执行，生成器函数在遇到`yield`之前会一直正常执行，遇到之后就会停止执行，同时保存当前函数作用域的状态。停止执行的生成器函数，只有调用`next()`之后才会继续执行，直到再次遇到`yield`、`return`或是生成器函数执行完毕（其实`throw`报错也会停止执行，后面再详细说明）。

```js
function* fn() {
  yield "dodo";
  yield "qwqw";
  yield "rtrt";
  yield "acac";
  yield "zvzv";
}
const obj = fn();
const obj2 = fn();
console.log(obj.next()); // {value:'dodo', done:false}
console.log(obj.next()); // {value:'qwqw', done:false}
console.log(obj.next()); // {value:'rtrt', done:false}

console.log(obj2.next()); // {value:'dodo', done:false}
```

`yield`关键字类似于`return`，`yield`返回的值是放在`value`属性里的，并且通过`yield`关键字退出的生成器函数会处在`done: false`状态；通过`return`关键字退出的生成器函数会处于`done: true`状态。

生成器函数内部的执行流程会针对每个生成器对象区分作用域。因此，在一个生成器对象上调用`next()`不会影响其他生成器对象。

1. 生成器对象可作为可迭代对象

   之前我们也提到了，生成器对象和迭代器一样实现了 Iterator 接口，因此生成器可以作为迭代器工厂函数`Symbol.iterator`进行使用。

   ```js
   const obj = {
     arr: [1, 2, 3, 4, 5],
     *[Symbol.iterator]() {
       //yield* 是 yield的强化用法
       yield* this.arr;
     },
   };

   for (let i of obj) {
     console.log(i);
   }
   // 1 2 3 4 5
   ```

2. 用`yield`实现输入输出

   除了可以作为函数的中间返回语句使用，`yield`关键字还可以作为函数的中间参数进行使用。使用`next()`方法时，传入一个参数`a`（只接受第一个参数）,`a`的值将作为上一次让生成器函数暂停的`yield`关键字的整体的值，没传值则为`undefined`。需要注意的是，第一次调用`next()`传入的值不会被使用，因为这一次调用是为了开始执行生成器函数。

   ```js
   function* fn(init) {
     const a = 3 * (yield 1 + init);
     const b = yield 3;
     console.log(a, b); // 18 8
   }
   const obj = fn(10);
   console.log(obj.next()); // {value:11, done:false}
   console.log(obj.next(6)); // {value:3, done:false}
   console.log(obj.next(8)); // {value:undefined, done:false}
   ```

   调用生成器生成生成器对象，`init = 10`；

   第一个`next()`方法，返回的`value = 1 + init = 11`；

   第二个`next()`方法，传入`6`，`a = 3 * (yield 1 + init) = 3 * 6 = 18`，返回的`value = 3`；

   第三个`next()`方法，传入`8`，`b = yield 3 = 8`，函数结束，返回`value = undefined,done = true`；

   结束后`a = 18,b = 8`。

3. 产生可迭代对象
   可以用星号（∗∗）加强`yield`关键字，使之可以访问可迭代对象，每次迭代一次对象。

   ```js
   const arr = [1, 2];
   function* fn() {
     yield* arr;
   }
   const obj = fn();
   console.log(obj.next()); // {value:1, done:false}
   console.log(obj.next()); // {value:2, done:false}
   ```

   因为 `yield*`实际上只是将一个可迭代对象序列化为一连串可以单独产出的值，所以这跟把 `yield`放到一个循环里没什么不同。下面这个生成器函数的行为是和上面的代码是等价的：

   ```js
   const arr = [1, 2];
   function* fn() {
     for (let i of arr) {
       yield i;
     }
   }
   const obj = fn();
   console.log(obj.next()); // {value:1, done:false}
   console.log(obj.next()); // {value:2, done:false}
   ```

   `yield*`的值是关联迭代器返回 `done: true` 时的 `value` 属性。对于普通迭代器来说，这个值是`undefined`。

   ```js
   const arr = [1, 2];
   function* fn() {
     console.log(yield* arr);
   }
   const obj = fn();
   console.log(obj.next()); // {value:1, done:false}
   console.log(obj.next()); // {value:2, done:false}
   // 函数内log，undefined
   console.log(obj.next()); // {value:undefined, done:true}
   ```

### 生成器作为默认迭代器

因为生成器对象实现了 Iterable 接口，而且生成器函数和默认迭代器被调用之后都产生迭代器，所以生成器格外适合作为默认迭代器。下面是一个简单的例子：

```js
const obj = {
  arr: [1, 2, 3, 4],
  *[Symbol.iterator]() {
    yield* this.arr;
  },
};

// 1 2 3 4
for (let i of obj) {
  console.log(i);
}
```

### 提前终止生成器

与迭代器类似，生成器也支持“可关闭”的概念。一个实现 Iterator 接口的对象一定有 `next()`方法，还有一个可选的 `return()`方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三个方法：`throw()`。

1. `reutrn()`
   `return()`方法会强制生成器进入关闭状态。提供给 `return()`方法的值，就是终止迭代器对象的值：

   ```js
   const arr = [1, 2];
   function* fn() {
     for (let i of arr) {
       yield i;
     }
   }
   const obj = fn();
   console.log(obj.next()); // {value:1, done:false}
   console.log(obj.return(4)); // {value:4, done:true}
   console.log(obj.next()); // {value:undefined, done:true}
   ```

   可以发现与迭代器不同的是，所有生成器对象都包含`return()`方法，只要调用`return()`方法，生成器对象就关闭，且不能恢复。之后再调用`next()`方法，就只会返回`done:true`，且提供的返回值无用。

2. `throw()`
   `throw()`方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭。相反如果错误被处理，生成器还可以恢复执行，且`throw()`方法会返回当前`yield`。再调用`next()`时，就会跳过上一个`yield`。

   ```js
   const arr = [1, 2, 3, 4];
   function* fn() {
     for (let i of arr) {
       yield i;
     }
   }
   const obj = fn();
   console.log(obj.next()); // {value:1, done:false}
   obj.throw("error");
   console.log(obj.next()); // {value:undefined, done:true}

   function* fn2() {
     for (let i of arr) {
       try {
         yield i;
       } catch (e) {}
     }
   }

   const obj2 = fn2();
   console.log(obj2.next()); // {value:1, done:false}
   console.log(obj2.throw("error")); // {value:2, done:false}
   console.log(obj2.next()); // {value:3, done:false}
   // 通过next() 访问到的只有 1 3
   // 2 被throw抛出。

   // 可以看下面这个例子
   function* fn3() {
     for (let i of arr) {
       try {
         if (i === 2) throw "out";
         yield i;
       } catch (e) {}
     }
   }

   for (let i of fn3()) {
     console.log(i);
   }
   // 1 3 4
   ```

   **注：如果生成器对象还没有开始执行，即没有调用过`next()`方法，那么调用`throw()`抛出的错误不会在函数内部被捕获，因为这相当于在函数块外部抛出了错误。生成器对象也会被关闭且无法恢复。**

## 总结

迭代是编程语言中常见的一种模式，在 ES6 中新增了两个新特性以支持迭代模式，迭代器和生成器。

迭代器是一个可以有任意对象实现的接口，这个接口的功能就是帮助迭代对象的值。实现 iterable 接口，就会包含一个`Symbol.itertor`函数，这个函数是工厂函数，用以产生一个实现了 itertor 接口的迭代器。迭代器拥有一个`next()`方法，通过这个方法可以得到对象连续的值。调用方法会返回一个`itertorObject`对象，这个对象包换两个属性`value`和`done`，`value`是迭代对象得到的值，而`done`是布尔值，标识迭代器是否迭代完成。可以手动调用`next()`进行迭代，也可以通过原生语言结构自动进行迭代，如`for...of`结构。

生成器是一种特殊的函数。声明函数时，在关键字`function`后加上一个星号（∗\*∗）就可以将这个函数声明为生成器函数。生成器函数调用时，并不会马上执行函数代码块，而是会返回一个生成器对象，生成器对象类似控制器，可以通过`next()`方法和`yield`关键字控制生成器函数的进行。主要过程如下：

1. 调用生成器函数得到生成器对象；
2. 调用生成器对象的`next()`方法开始执行函数；
3. 函数执行到 `yield`关键字时，返回一个`itertorObject`对象（由`next()`返回），`value`是`yield`关键字后的值，`done`标识函数是否执行完毕；
4. 再次调用`next()`，可以恢复函数的执行，直到再次遇到`yield`或函数执行完毕。
   加一个星号还可以加强`yield`关键字，即`yield*`。`yield*`可以对可迭代对象进行迭代，一次调用消费一个值。由上可知，生成器对象也实现了 itertor 接口，这也意味着生成器函数很适合作为可迭代对象的`Symbol.itertor`函数进行使用。
