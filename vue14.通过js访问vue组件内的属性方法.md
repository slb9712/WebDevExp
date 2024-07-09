## 思路：1、通过调用函数把 组件实例 this 传递到 被应用的 js 文件里。2、把一些属性和方法挂载到 vue 实例原型上，自然也就可以在某个 js 文件中拿到 vue 实例了。

1. 在 utils.js 中定义一个变量和一个函数，该变量用于存放组件实例 this，该函数用于接收组件实例 this。
```js
// 用来存放调用此js的vue组件实例（this）
let vm = null

const sendThis = ( _this )=> {
  vm = _this
}

export default {
  sendThis, // 暴露函数
  description: '我是一个工具类方法',
  getData() {
    console.log(vm) // 打印拿到的组件实例
    console.log(vm.userProfile) // 打印组件中的data
  },
  callMethod() {
   vm.clearForm() // 调用组件中的methods
  }
}
```
2. 在 vue 中引入 utils.js，然后在钩子函数中调用 utils.js 的 sendThis 方法，把 this 传过去即可。
```js
<template>
 <div class="my-component"></div>
</template>

<script>
import utils from './utils'

export default {
 name: 'MyComponent',
 data() {
  return {
   userProfile: ''
  }
 },
 mounted() {
  // 发送this 到 js 文件里
  utils.sendThis(this);
 },
 methods: {
  // 这个函数会在 utils.js 文件中被调用
  clearForm() {
   // 执行一些操作
  },
  // 打印 utils.js 中的 description
  showMsg() {
   console.log(utils.description)
  }
 }
}
</script>
```