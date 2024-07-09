## 双向数据绑定
Vue中数据双向绑定主要是指当数据发生变化时，视图发生变化；当视图发生变化时，数据也发生响应的变化。
其中视图发生变化时，可以用事件绑定来实现数据发生相应的变化，

Vue中体现出的双向绑定有两种方式：v-model属性和.sync修饰符

1. Vue内部是如何监听message数据的改变的；
——Object.defineProperty ->监听对象属性的改变
2. 当数据发送改变，Vue是如何知道要通知哪些人，界面发生刷新
——发布订阅者模式


## vue中处理过程的几个关键：

1. 监听者Observer：监听者会对Vue实例中data选项的全部属性（包括属性对象的子属性）都加上getter和setter。这样的话，给这个对象的某个属性赋值时，我们就可以监听到数据变化了。
2. 解析器Complie：解析Vue模板指令，将模板中的初始变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据发生改变，订阅者收到通知，调用更新函数对页面数据进行更新。
3. 订阅者Watcher：Watcher订阅者是Observer和Complie之间通信的桥梁，主要的任务是订阅Observer中属性值变化的信息，当属性值发生改变时，触发解析器Complie中对应的更新函数。
4. 订阅器Dep：订阅器采用 发布-订阅 设计模式，用来收集对应属性的订阅者Watcher，对监听器Observer和订阅者Watcher进行统一管理。


## Vue2.0中数据双向绑定的过程：

一个Vue实例在初始化数据时，监听器Observer会调用Object.defineProperty对该Vue实例中data选项的全部属性（包括属性对象的子属性）添加上getter和setter方法，在数据被修改时在setter方法设置监视修改页面信息，也就是说每当数据被修改，就会触发对应的set方法，并对每个属性添加一个订阅器Dep，用于存储监听该属性值变化的订阅者Watcher，当属性值发生变化时，该属性值中的订阅器Dep会通知其订阅者数组，Watcher作为Observe和Compile中间的桥梁，订阅Observe属性变化的消息，触发Compile更新函数，Watcher则会调用自身的update()方法，并触发Compile中绑定的回调，更新视图。

## Proxy只会代理对象的第一层，Vue3是怎样处理这个问题的呢？
答：proxy判断当前的reflect.get的返回值是否为object，如果是则再通过reactive方法做代理，这样就实现了深度观测

## 检测数组的时候可能触发多次get/set，那么如何防止触发多次呢？
我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行tigger

## Proxy的优势如下
proxy创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值

Proxy可以直接监听整个对象而非属性。
Proxy可以直接监听数组的变化。
Proxy有13中拦截方法，如ownKeys、deleteProperty、has 等是 Object.defineProperty 不具备的。
Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改;
Proxy做为新标准将受到浏览器产商重点持续的性能优化,也就是传说中的新标准的性能红利。

## Object.defineProperty 的优势如下

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平。
## Object.defineProperty 不足在于：

Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。
Object.defineProperty不能监听数组。是通过重写数据的那7个可以改变数据的方法来对数组进行监听的。
Object.defineProperty 也不能对 es6 新产生的 Map,Set 这些数据结构做出监听。
Object.defineProperty也不能监听新增和删除操作，通过 Vue.set()和 Vue.delete来实现响应式的。