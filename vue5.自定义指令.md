## 自定义全局指令
在main.js里面定义
```js
Vue.directive('color', {
    bind(el, binding) {
        el.style.color = binding.value
    },
    update(el, binding) {
        el.style.color = binding.value
    }
})
```

## 自定义私有指令

```vue
<script>
export default {
    data() {
        return {
            
        }
    },
    //自定义指令的节点
    directives:{
     //创建一个color指令，执行配置对象。
        color:{
        //当指令帮到元素上的时候，聚会出发bind函数
        //el参数标识当前绑定的dom对象
            bind(el,binding){
                el.style.color=binding.value
            }
        }
    }

    // 简写形式
    directives:{
    //将指令对象改写成指令函数
        color(el,binding){
            el.style.color=binding.value
        }
    }
}
</script>
```