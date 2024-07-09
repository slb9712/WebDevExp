## vue有四个全局指令：
directive、extent、set、component

1. directive:自定义指令
```js
//写一个改变颜色的指令
Vue.directive('amie',function(el,binding,vnode){
        el.style='color:'+binding.value;
});

//HTML
<div v-amie="'red'"></div>
```

 2. extent:作用和组件差不多,但是每次挂载都要new一次在$mount挂载(可以挂载到实例范围以外的地方)，不像组件那样可以多次复用不需要new

 3. set:改变Vue实例data的值, Vue检测不了对象属性的变化，用set可以改变对象中的属性
 ```js
 Vue.set(dataObj,'count',4);
 ```
 4. component:定义全局组件，在任意Vue实例内都可以使用

 5. mixin:全局混入
 ```js
 Vue.mixin({
    data() {
        return {
            newData: 999
        }
    }
})
// 新建的Vue实例都会在它们的data里面混进这个newData
// 全局的mixin-->局部-->原生的mixin,顺序后的会覆盖顺序前的
 ```