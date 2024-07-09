Ref——Table样式更新

```js
const ref = useRef(initValue);
```

useRef返回一个可变的ref对象，其ref.current属性被初始化为传入的参数（initialValue）。
返回的 ref 对象在组件的整个生命周期内保持不变。
useRef可以获取dom。
返回值可以被dom元素ref标记，可以获取被标记的元素节点
useRef缓存数据。
usestate ,useReducer 是可以保存当前的数据源的，但是如果它们更新数据源的函数执行必定会带来整个组件从新执行到渲染，如果在函数组件内部声明变量，则下一次更新也会重置。
如果想要保存数据，而又不想触发函数的更新，那么使用useRef。


```js
// 组件样式时时更新
// ...

```