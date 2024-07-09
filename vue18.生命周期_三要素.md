## 钩子函数 vue2

挂载阶段 beforeCreate：初始化空Vue实例对象，身上只有默认周期函数和事件，其它data,method都没有被初始化

created:实例创建完成，可以访问data，methods，watch，computed方法和数据，不能操作Dom。

beforeMounted:挂载之前调用，找到template编译成render函数，render首次调用生成虚拟Dom。

mounted：实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，最早操作Dom在mounted中。

更新阶段 beforeUpdate：页面中显示数据未更新，data中是最新的

虚拟Dom重新渲染和patch:先根据data中最新数据渲染出一份最新的虚拟Dom，然后re-render和patch，把更新的虚拟Dom数据渲染到视图上。

updated：页面数据同步更新

销毁阶段 beforeDestroy：实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例，常用于销毁定时器、解绑全局事件、销毁插件对象等操作

destroyed


## 父子组件钩子函数执行顺序
父子组件钩子函数在三个阶段的代码执行顺序 挂载：父亲created> 子created > 子mounted> 父亲mounted> 更新：父亲beforeUpdate > 子beforeUpdated > 子updated > 父亲updated 销毁：父亲beforeDestroy> 子beforeDestroy > 子destroyed> 父destroyed

## Vue3钩子函数
setup() : 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
onBeforeMount() : 组件挂载到节点上之前执行的函数；
onMounted() : 组件挂载完成后执行的函数；
onBeforeUpdate(): 组件更新之前执行的函数；
onUpdated(): 组件更新完成之后执行的函数；
onBeforeUnmount(): 组件卸载之前执行的函数；
onUnmounted(): 组件卸载完成后执行的函数；

## vue三要素
响应式、模板引擎：字符串，逻辑，嵌入js变量，模板必须转为js代码、render函数类似于h函数，返回vnode，updateComponent更新，渲染

1. 解析模板成render函数，所有信息都被render包含，data中的属性变成了js变量，v-model，v-for，v-if都变成了js逻辑，render函数返回vnode
2. 响应式开始监听。 defineObjectdata的属性代理到vm上
3. 首次渲染，1.执行updatecComponent,先执行vm_render()，2.render函数执行后，被响应式get监听，后面set监听的时候先看有没有被get监听，没有被监听就不管，说明用不到，减少不必要的渲染。3.执行updateComponent,patch函数 4. patch将vnode渲染成dom，初次渲染完成。显示页面，绑定依赖
4. data属性变化，set监听到，重新执行updateComponent，重新执行render，生成vnode，再进行patch比较渲染

## keep-alive
缓存方法：
1. 被keep-alive包裹的组件，会进行缓存，include/exclude(可以为字符串，数组，以及正则表达式,只有匹配的组件会被缓存)
2. 和路由配合使用：在路由中添加meta属性。` meta: { keepAlive: true }     // 需要缓存`
使用keep-alive导致组件不重新加载，也就不会重新执行生命周期的函数，如果要解决这个问题，就需要在组件中设置两个属性   进入时触发：activated 退出时触发：deactivated 

适用场景：首页展示固定数据的组件，比如banner九宫格




