
## useState

使用一个称为 "fiber" 的数据结构来跟踪组件的状态。每个组件都有一个与之关联的 fiber，每个 fiber 都有一个与之关联的 state 链表。当你调用 useState 时，React 会在当前的 fiber 上添加一个新的 state 节点。




```js
let stateArr =[]
let idx = 0
function useState(initstate) {
    const curIdx = idx;
    stateArr[curIdx] = stateArr[curIdx] ? stateArr[curIdx] : initstate

    function setState(newState) {
        stateArr[curIdx] = newState
        render()
        idx = 0
        // 利用数组存储了所有状态变量，index代表的是变量在数组中的顺序。当调用setValue方法改变状态值时，会重新执行整个组件函数，并在之前会重置index为0，原因在于重新执行组件函数时会再次依照状态变量的申明顺序去hooks中去获取值。
         // 基于以上，便可理解为何不能在条件语句中申明状态变量
        // 条件的变动会影响状态变量的顺序读值，即hooks中的index出现混乱。可将上述代码中注释部分放开，测试结果。
    }
    idx++
    return [stateArr[curIdx], setState]
}
```

## useEffect
存储了useEffect函数依赖项，执行useEffect函数时，如果没有依赖项，将其参数函数放进队列；如果有依赖项，会找到其依赖项上次状态与此次状态加以比较，如果发生了变化，将其参数函数放进队列。在渲染完成后执行队列任务并 清空。
