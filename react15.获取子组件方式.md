## 1.直接使用ref

## 2. 在函数组件中要获取子组件的数据,需要两步骤
1.将ref传递到子组件中,2.需要使用forwardRef对子组件进行包装

```js
// 父组件
export default () => {
  const parentRef = useRef();
  function focusHander() {
    console.log(parentRef);
    parentRef.current.focus();
    parentRef.current.value = '哈哈';
  }
  return (
    <>
      <ForwardChild ref={parentRef} />
      <button onClick={focusHander}>获取焦点</button>
    </>
  )
}

// 子组件中

function Child(props, parentRef) {
  console.log(props);
  return (
    <>
      <input type="text" ref={parentRef} />
    </>
  )
}
/**
 * 使用forwardRef将ref直接传递进去
 */
let ForwardChild = forwardRef(Child);
```

## 上面的方式都会将input组件中全部的数据暴露出去,有时候我们想只想暴露出一部分数据
通过useImperativeHandle搭配forwardRef
通过useImperativeHandle搭配forwardRef是React 中的一个 Hook，它能让你自定义由 ref 暴露出来的句柄。
forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。使用 forwardRef() 让组件接收 ref 并将其传递给子组件。
```js

// 父组件
export default () => {
  const parentRef = useRef();

  const focusHandler = () => {
    parentRef.current.focus();
  }
  return (
    <>
      <ForwardChidl ref={parentRef} name={'你好'} />
      <button onClick={focusHandler}>获取焦点</button>
    </>
  )
}

// 子组件
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'

function Child(props, parentRef) {
  const inputRef = useRef();
  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到,没返回的值就获取不到
    return {
      focus() {
        inputRef.current.focus();
      }
    }
  })
  return (
    <>
      <p>{props.name}</p>
      <input type="text" ref={inputRef} />
    </>
  )
}

let ForwardChidl = forwardRef(Child);


```
