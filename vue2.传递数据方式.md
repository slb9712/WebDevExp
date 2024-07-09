1. 父向子
父组件通过prop给子组件下发数据，子组件通过事件给父组件发送消息。

自定义属性传值，子组件不能修改
```js
// 父组件
<child :inputName="name"></child>

// 子组件
// 接受父组件的值
props: { //在这里对传过来的进行接收
  inputName:{
  type : String,  
  default: ''
  }
}
```

2. 子向父
自定义事件
子组件可以通过$emit触发父组件的自定义事件。vm.$emit(event,arg) 用于触发当前实例上的事件；
```js
// 子组件
// childByValue是在父组件on监听的方法
// 第二个参数this.childValue是需要传的值
this.$emit('childByValue', this.childValue) 

// 父组件
<child @childByValue="getChildByValue"></child>
let getChildByValue = function (childValue) {
  // childValue就是子组件传过来的值
  this.name = childValue
}

```
3. 兄弟 event bus 通过向外共享vue实例对象
```js
//bus.js
import Vue from 'vue'
export default new Vue()

// 父组件 发送数据
import Bus from './bus.js'
Bus.$emit('methodName', this.elementValue)

// 子组件 接收数据
Bus.$on('methodName', (data) => {
  console.log(data)
  vm.name = data
})
// 频繁使用eventbus会有什么问题？？？？？？？？？？？？？？？

// beforeDestroy（）生命周期函数里取消监听
beforeDestroy () {
    bus.$off('select'，this.handle)

}
```

4. vue3 依赖注入provide inject
provide函数提供数据和函数给后代组件使用
inject函数给当前组件注入provide提供的数据和函数
```js
// 父组件
provide('changeMoney', val)
provide('changeMoney', method)

// 子组件
const money = inject('val')
const mtd = inject('method')
```

5. vuex

6. 父组件直接调用子组件方法
子组件标签上面 定义 ref属性 值自定义
```js
<Child ref="child"></Child>
 
show(){
  this.msg=this.$refs.child.getData()
}
```