1. vue2和vue3双向数据绑定原理发生了改变
vue2 的双向数据绑定是利用ES5 的一个 API Object.definePropert()对数据进行劫持 结合 发布订阅模式的方式来实现的。
vue3 中使用了 es6 的 ProxyAPI 对数据代理。

### 相比于vue2.x，使用proxy的优势如下:
defineProperty只能监听某个属性，不能对全对象监听
可以省去for in、闭包等内容来提升效率（直接绑定整个对象即可）
可以监听数组，不用再去单独的对数组做特异性操作 vue3.x可以检测到数组内部数据的变化

2. Vue3可以有多个根节点，vue2一个

3. 最大的区别Composition API
旧的选项型API在代码里分割了不同的属性: data,computed属性，methods，等等。新的合成型API能让我们用方法（function）来分割，相比于旧的API使用属性来分组，这样代码会更加简便和整洁。

4. 生命周期

5. 传参不同setup() 函数特性 

1、setup函数中不能使用this。Vue 为了避免我们错误的使用，直接将 setup函数中的this修改成了 undefined）

2、setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。但是，因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性。

如果需要解构 prop，可以通过使用 setup 函数中的toRefs 来完成此操作