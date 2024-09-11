---
title: React 16 到 18 更新特性总结
date: 2019-07-15 14:29:21
updated: 2024-07-10 17:20:49
tags:
  - react
categories:
  - 前端
  - react
keywords:
  - react
description:
top_img:
comments:
cover: /assets/img/post/cover-blog-react.jpeg
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

## React 16 特性

### Fiber 架构

React 16 引入了全新的 [Fiber 架构]( https://github.com/acdlite/react-fiber-architecture)，这是 React 内部实现的一次彻底重写。Fiber 架构带来了更好的错误处理、更高效的渲染和更新机制，以及支持异步渲染的能力。

### 错误边界

错误边界是一种新的组件，用于捕获其子组件树中的 JavaScript 错误，并展示回退 UI，而不会崩溃整个应用。

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

### Portals

Portals 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点中的优秀方法。

```javascript
ReactDOM.createPortal(
  <div>Portal Content</div>,
  document.getElementById('portal-root')
);
```

### Fragment

Fragment 允许你将多个子元素分组，而不在 DOM 中增加额外的节点。

```javascript
render() {
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>Description</p>
    </React.Fragment>
  );
}
```

## React 16.3 特性

### 新的 Context API

新的 Context API 提供了一种更加简单和直观的方式来在组件树中传递数据，而不需要显式地通过每层组件的 props。

```javascript
const MyContext = React.createContext();

class MyProvider extends React.Component {
  render() {
    return (
      <MyContext.Provider value="Hello, Context!">
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class MyComponent extends React.Component {
  static contextType = MyContext;
  render() {
    return <div>{this.context}</div>;
  }
}
```

### createRef API

createRef API 提供了一种新的方式来创建引用，以访问 DOM 节点或 React 元素。

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}>Hello, Ref!</div>;
  }
}
```

### forwardRef API

forwardRef API 允许你通过使用 ref 属性将引用传递到子组件。

```javascript
const MyInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return <MyInput ref={this.inputRef} />;
  }
}
```

### 新的生命周期

为了更好的支持异步渲染（Async Rendering），解决一些生命周期滥用可能导致的问题，React 从 V16.3 开始，对生命周期进行渐进式调整，同时在官方文档也提供了使用的最佳实践。

这里我们将简要对比 React 新旧生命周期，重新认识一下 React 生命周期。

先看看两张经典的生命周期的示意图

<p style="text-align: center;">
  <img src="https://cdn.jsdelivr.net/gh/Duo-Huang/cdn/blog/img/post/2019-07-15/react-old-lifecycle.png" alt="react-old-lifecycle" />
  <span>[旧的生命周期]</span>
</p>
<br/>
<br/>
<p style="text-align: center;">
  <img src="https://cdn.jsdelivr.net/gh/Duo-Huang/cdn/blog/img/post/2019-07-15/react-new-lifecycle.png" alt="react-new-lifecycle" />
  <span>[新的生命周期]</span>
</p>
<br/>

React 16.3 新增的生命周期方法

1. getDerivedStateFromProps()
2. getSnapshotBeforeUpdate()

逐渐废弃的生命周期方法：

1. componentWillMount()
2. componentWillReceiveProps()
3. componentWillUpdate()

> 虽然废弃了这三个生命周期方法，但是为了向下兼容，将会做渐进式调整。（详情见#12028）
>
> V16.3 并未删除这三个生命周期，同时还为它们新增以 UNSAFE_ 前缀为别名的三个函数 UNSAFE_componentWillMount()、UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate()。
>
> 在 16.4 版本给出警告将会弃用 componentWillMount()、componentWillReceiveProps()、componentWillUpdate() 三个函数
>
> 然后在 17 版本将会删除 componentWillMount()、componentWillReceiveProps()、componentWillUpdate() 这三个函数，会保留使用 UNSAFE_componentWillMount()、UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate()

## React 16.6 特性

### React.memo

React.memo 是一个高阶组件，用于优化函数组件的性能，类似于类组件的 shouldComponentUpdate。

```javascript
const MyComponent = React.memo((props) => {
  return <div>{props.value}</div>;
});
```

### React.lazy 和 Suspense

React.lazy 和 Suspense 提供了代码拆分和懒加载组件的方式。

```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </React.Suspense>
  );
}
```

## React 16.8 特性

### Hooks

Hooks 是一套新的 API，允许你在函数组件中使用 state 和其他 React 特性。

```javascript
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### React 17 特性

### 无重大新增特性

React 17 主要是为了提升稳定性和易用性，没有引入新的特性。它旨在为未来的版本做准备，并支持渐进升级。

## React 18 特性

### 并发模式

[并发模式](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)（Concurrent Mode）允许 React 在不阻塞主线程的情况下执行渲染工作，从而使得应用更加响应。

### 自动批处理

[自动批处理](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching)（Automatic Batching）是 React 18 引入的一项新特性，用于优化多个状态更新的处理。

```javascript
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 两个状态更新将被自动批处理
}
```

### 新的 API

React 18 引入了几个新的 API，如 startTransition 和 useDeferredValue，用于更好地管理状态更新和 UI 渲染。

```javascript
import { useTransition, useDeferredValue } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const deferredValue = useDeferredValue(value);

  return (
    <div>
      <input value={deferredValue} onChange={(e) => {
        startTransition(() => {
          setValue(e.target.value);
        });
      }} />
      {isPending && <span>Loading...</span>}
    </div>
  );
}
```

### useDeferredValue Hook

useDeferredValue Hook 允许你延迟某个值的更新，直到其不再影响关键的渲染路径，从而避免不必要的渲染和卡顿。

```javascript
import { useState, useDeferredValue } from 'react';

function MyComponent() {
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Deferred Value: {deferredValue}</p>
    </div>
  );
}
```

### Suspense Improvements

React 18 在 Suspense 组件中增加了对数据加载的支持，这使得处理异步操作变得更加简单和直观。

```javascript
import { Suspense, useState, useEffect } from 'react';

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data Loaded'), 2000);
  });
}

function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (!data) {
    throw fetchData();
  }

  return <div>{data}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}
```

### useTransition Hook

useTransition Hook 提供了一种更细粒度的控制方式，可以将不紧急的更新标记为过渡状态。

```javascript
import { useState, useTransition } from 'react';

function MyComponent() {
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setList(Array.from({ length: 20000 }, (_, i) => i));
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Load List</button>
      {isPending ? 'Loading...' : list.map(item => <div key={item}>{item}</div>)}
    </div>
  );
}
```

## 总结

React 从 16 到 18 版本引入了大量的新特性和改进，旨在提升性能、简化开发流程并增强用户体验。通过这些更新，React 继续保持其在前端开发中的领先地位。
