## vue-router的实现原理
首先vue-router实现了 在无需刷新页面的情况下更新视图
对比：location.href=""实现了跳转但是刷新了页面
在浏览器环境下的两种方式，分别就是在HTML5History，HashHistory两个类中实现的。

## router是怎么做到在每一个Vue组件中都能使用的呢
插件加载的地方，即VueRouter的install方法中通过Vue.mixin()全局注册一个混合，影响到每一个组件。

##  HashRouter 和 HistoryRouter的区别和原理？
需要兼容低版本的浏览器时，建议使用hash模式。
1. history和hash都是利用浏览器的两种特性实现前端路由，history是利用浏览历史记录栈的API实现，hash是监听location对象hash值变化事件来实现 

2. history的url没有'#'号，hash反之 

3. 相同的url，history会触发添加到浏览器历史记录栈中，hash不会触发，history需要后端配合，如果后端不配合刷新新页面会出现404，hash不需要。 
(pushState设置的新url和当前url相同时也会把记录添加进记录栈中，而hash只有新的和当前的不同的时候才会添加到栈中)

hash虽然出现在URL中，但不会被包括在HTTP请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变hash不会重新加载页面

4. HashRouter的原理：通过`window.onhashchange`方法获取新URL中hash值，再做进一步处理 
window.addEventListener("hashchange", funcRef, false)


HistoryRouter的原理：通过`history.pushState `使用它做页面跳转不会触发页面刷新，使用`window.onpopstate` 监听浏览器的前进和后退

History接口 是浏览器历史记录栈提供的接口，通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。
```js
window.history.pushState(stateObject, title, URL)
 
window.history.replaceState(stateObject, title, URL)
//共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前URL改变了，但浏览器不会刷新页面
```


## 路由懒加载
1. VUE中的异步组件进行懒加载方式: component: resolve => (require(['../views/About'], resolve)) 

2. ES6 import: component: () => import('...')

## 从设置路由改变到视图更新的流程
$router.push() --> HashHistory.push() --> History.transitionTo() --> History.updateRoute() --> {app._route = route} --> vm.render()


