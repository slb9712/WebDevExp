## Reconciliation（diff）算法

## React的diff算法就是调和的具体实现，调和就是将虚拟dom转换为真实dom的最小过程
三种diff
1. tree diff Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计

(1)React通过updateDepth对Virtual DOM树进行层级控制。

(2)对树分层比较，两棵树只对同一层次节点进行比较。如果该节点不存在时，则该节点及其子节点会被完全删除，不会再进一步比较。

(3)只需遍历一次，就能完成整棵DOM树的比较

如果DOM 节点出现了跨层级操作，Diff会怎么办？
答：Tree DIFF是对树的每一层进行遍历，如果某组件不存在了，则会直接销毁。

2. component diff 拥有相同类的两个组件 生成相似的树形结构，拥有不同类的两个组件 生成不同的树形结构。
React对不同的组件间的比较，有三种策略

(1)同一类型的两个组件，按原策略（层级比较）继续比较Virtual DOM树即可。

(2)同一类型的两个组件，组件A变化为组件B时，可能Virtual DOM没有任何变化，如果知道这点（变换的过程中，Virtual DOM没有改变），可节省大量计算时间，所以用户可以通过 shouldComponentUpdate() 来判断是否需要判断计算。

(3)不同类型的组件，将一个（将被改变的）组件判断为dirtycomponent（脏组件），从而替换整个组件的所有节点。

3. element diff 对于同一层级的一组子节点，通过唯一id区分。
当节点处于同一层级时，diff提供三种节点操作：删除、插入、移动。


基于Diff的开发建议
基于tree diff：

开发组件时，注意保持DOM结构的稳定；即，尽可能少地动态操作DOM结构，尤其是移动操作。
当节点数过大或者页面更新次数过多时，页面卡顿的现象会比较明显。
这时可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点。
基于component diff：

注意使用 shouldComponentUpdate() 来减少组件不必要的更新。
对于类似的结构应该尽量封装成组件，既减少代码量，又能减少component diff的性能消耗。
基于element diff：

对于列表结构，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。



## 调和的目的
在用户无感知的情况下将数据的更新体现到UI上。

## 触发调和过程的方式
ReactDom.render()函数 和ReactNativeRenderer.render()函数

setState()、forceUpdate()、componentWillMount 、componentWillReceiveProp 中直接修改了state

hooks 中的useReducer 和 useState 返回的钩子函数

## 调和的工作原理
## render 阶段
构建 Fiber 对象，构建链表，在链表中标记要执行的 DOM 操作 ，可中断。

 const fiber = {
stateNode,// dom节点实例
child,// 当前节点所关联的子节点
sibling,// 当前节点所关联的兄弟节点
return// 当前节点所关联的父节点
}
支持暂停，终止以及恢复之前的渲染任务

支持增量渲染，fiber将react中的渲染任务拆分到每一帧

通过fiber赋予了不同任务的优先级

当数据发生改变引起页面组件进行更新，进入diff算法：

## commit 阶段
根据构建好的链表进行 DOM 操作，不可中断。

fiber是一种数据结构，使用父子关系以及next的妙用，以链表形式模拟了传统调用栈。 fiber是一种调度让出机制，只在有剩余时间的情况下运行。 fiber实现了增量渲染，在浏览器允许的情况下一点点拼凑出最终渲染效果。 fiber实现了并发，为任务赋予不同优先级，保证了一有时间总是做最高优先级的事，而不是先来先占位死板的去执行。 fiber有协调与提交两个阶段，协调包含了fiber创建与diff更新，此过程可暂停。而提交必须同步执行，保证渲染不卡顿。

而通过fiber的协调阶段，我们了解了diff的对比过程，如果将fiber的结构理解成一棵树，那么这个过程本质上还是深度遍历，其顺序为父—父的第一个孩子—孩子的每一个兄弟。

通过源码，我们了解到react的diff是同层比较，最先比较key，如果key不相同，那么不用比较剩余节点直接删除，这也强调了key的重要性，其次会比较元素的type以及props。而且这个比较过程其实是拿旧的fiber与新的虚拟dom在比，而不是fiber与fiber或者虚拟dom与虚拟dom比较，其实也不难理解，如果key与type都相同，那说明这个fiber只用做简单的替换，而不是完整重新创建，站在性能角度这确实更有优势