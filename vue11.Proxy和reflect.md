## Proxy
用于帮助我们创建一个代理对象，如果我们需要监听对象的操作，那么我们可以通过Proxy先创建一个代理对象，之后对该对象的所有操作都通过代理来完成。他与Object.defineProperty最大的区别就在于defineProperty直接监听对象的属性，proxy是监听整个代理对象。

## Reflect有什么用呐？
它主要提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法； 比如Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()；

## 如果我们有Object可以做这些操作，那么为什么还需要有Reflect这样的新增对象呢？

这是因为在早期的ECMA规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些API放到了Object上面；但是Object作为一个构造函数，这些操作实际上放到它身上并不合适；另外还包含一些类似于 in、delete操作符，让JS看起来是会有一些奇怪的；所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上。

真正意义上不直接操作原对象。

## 常见的Reflect方法
Reflect.getPrototypeOf(target)：类似于 Object.getPrototypeOf()。
Reflect.setPrototypeOf(target, prototype)：\