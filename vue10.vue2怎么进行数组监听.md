使用函数劫持的方式，重写了数组的方法
Vue 将 data 中的数组，进行了原型链重写。在原本的原型链上插入了一个新的原型对象，在新的原型对象上重写了7个变异方法（push/pop/unshift/shift/splice/sort/reverse）指向了重新定义的数组原型方法，这样当调用数组API 的时候，可以通知依赖更新。如果数组中包含着引用类型。会对数组中的引用类型再次进行监控。



Vue3.0的监听采用的是ES6新的构造方法Proxy来代理原对象做变化检测，当异步触发Model里的数据变化时，必须经过Proxy这一层，在这一层则可以监听数组以及各种数据类型的变化
```js
const arr = [1, 2, 3]
const arrProxy = new Proxy(model, {
  set() {
    console.log('数组变化')
  }
})