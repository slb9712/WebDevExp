## useTransition，用于处理缓慢的状态更新，在不阻塞 UI 的情况下更新状态的 React Hook。。他会返回一个startTransition函数和isPending状态
明确标记某些状态更新和由它们引起的重新渲染为“非关键”，React会在「后台」计算这些更新，而「不会阻塞主任务」。如果发生关键事件（即正常状态更新），React将暂停其后台渲染，执行关键更新，然后「要么返回到先前的任务，要么完全放弃它并启动一个新任务」。 比如下边的tab更新以及由他带来的渲染都在后台计算，不会阻塞页面

场景，切换tab展示不同内容，其中一个tab耗时比较久，在快速切换的过程中，会产生并发渲染，切换到耗时页面时会有卡顿

不能代替防抖，应为后台计算更新很快，在输入间隔时间内就能计算好并提交值，达不到预期效果

```js

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');
 
  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ……
}
```
# 只有在可以访问该状态的 set 函数时，才能将其对应的状态更新包装为 transition。如果想启用 transition 以响应某个 prop 或自定义 Hook 值，需要使用 useDeferredValue

## useDeferredValue 工作方式类似于useTransition，允许我们「将某些更新标记为非关键并将它们移至后台」 延迟更新 UI 的某些部分。 将异步请求和状态更新操作包裹起来，该延迟更新状态。避免在频繁输入时产生连续的重渲染。
useDeferredValue 执行的延迟重新渲染默认是可中断的。这意味着，如果 React 正在重新渲染一个大型列表，但用户进行了另一次键盘输入，React 会放弃该重新渲染，先处理键盘输入，然后再次开始在后台渲染。
useDeferredValue 不需要选择任何固定延迟时间。如果用户的设备很快（比如性能强劲的笔记本电脑），延迟的重渲染几乎会立即发生并且不会被察觉。如果用户的设备较慢，那么列表会相应地“滞后”于输入，滞后的程度与设备的速度有关。
防抖和节流仍会产生不顺畅的体验，因为它们是阻*的：它们仅仅是将渲染阻塞键盘输入的时刻推迟了,减少网络请求的次数。

```js
const [state, setState， cancelUpdate] = useDeferredValue(initialState, {
  timeoutMs: 1000, // 延迟更新时间，单位毫秒
  maximumTimeMs: 5000, // 最长延迟更新时间，单位毫秒
  equalityFn: (a, b) => a.id === b.id, // 状态相等性比较函数
});
```

问题

1. 使用 useDeferredValue 可能会导致数据不一致。例如，在用户更改搜索关键字时，我们可能需要在搜索框下方显示搜索结果。但是，由于使用了 useDeferredValue，搜索结果可能不会立即更新，而是在下一帧或更远的时间更新。这可能会导致搜索结果和搜索关键字不匹配，从而导致数据不一致。
2. 可能会导致内存泄漏。由于 useDeferredValue 可以在下一帧或更远的时间更新状态，因此如果在状态更新期间组件已被卸载，可能会导致内存泄漏。也提供了一个可选的取消函数cancelUpdate，可以用来在组件卸载时取消未完成的状态更新。