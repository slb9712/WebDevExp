## react-router
前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面

路由的本质就是页面的URL发生改变时，页面的显示结果可以根据URL的变化而变化，但是页面不会刷新

因此，可以通过前端路由可以实现单页(SPA)应用

react-router主要分成了几个不同的包：

react-router: 实现了路由的核心功能

react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能

react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能

react-router-config: 用于配置静态路由的工具库

## 模式
hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1
history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

对应的hash模式和history模式对应的组件为：

HashRouter
BrowserRouter

改变hash值并不会导致浏览器向服务器发送请求，浏览器不发出请求，也就不会刷新页面

hash 值改变，触发全局 window 对象上的 hashchange 事件。所以 hash 模式路由就是利用 hashchange 事件监听 URL 的变化，从而进行 DOM 操作来模拟页面跳转

react-router也是基于这个特性实现路由的跳转

# Route
Route用于路径的匹配，然后进行组件的渲染，对应的属性如下：

path 属性：用于设置匹配到的路径
component 属性：设置匹配到路径后，渲染的组件
render 属性：设置匹配到路径后，渲染的内容
exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件

# redirect 通常路径的跳转是使用Link组件 NavLink