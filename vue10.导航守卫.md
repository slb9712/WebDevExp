全局前置守卫 beforeEach
用于登录验证，也就是路由还没跳转提前告知，以免跳转了再通知就为时已晚
全局后置钩子 afterEach（to，from）
路由独享守卫 beforeEnter（to，from， next）和beforeEach完全相同，如果两个都设置了，beforeEnter则在beforeEach之后紧随执行。在路由配置上直接定义beforeEnter守卫
组件前置守卫 beforeRouteEnter（to，from， next）
该钩子在全局守卫beforeEach和独享守卫beforeEnter之后，全局beforeResolve和全局afterEach之前调用，要注意的是该守卫内访问不到组件的实例，也就是this为undefined。因为它在组件生命周期beforeCreate阶段触发，此时的新组件还没有被创建。在这个钩子函数中，可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
 组件更新守卫 beforeRouteUpdadte（to，from， next）
在当前路由改变时，并且该组件被复用时调用，可以通过this访问实例
组件离开守卫 beforeRouteLeave（to，from， next）
导航离开该组件的对应路由时调用，可以访问组件实例this。这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过next( false )来取消