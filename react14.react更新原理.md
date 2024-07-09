## Reconciliation（diff）算法
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