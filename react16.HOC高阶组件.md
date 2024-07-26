
高阶组件（HOC，Higher-Order Components）不是组件，不是 React API 的一部分，是从 React 的组合特性（Compositional Nature）中产生的一种设计模式。可以看作是一个函数，它会接收一个组件作为参数并返回一个经过改造的新组件：将某个组件转换成另一个组件的纯函数。

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

高阶组件有两种实现方式，分别是**属性代理**和**反向继承**。它可以看作是装饰器模式在 React 中的实现：在不修改原组件的情况下实现组件功能的增强。
高阶组件的实用性使其频繁地被大量 React.js 相关的第三方库，如 React-Redux的 connect 方法、React-Loadable等所使用，了解高阶组件对我们理解各种 React.js 第三方库的原理很有帮助。

使用场景：多个页面，只有有权限的才能看，或者说登录校验，就可以封装一个高阶组件，传入不同的页面组件，高阶组件内部判断权限，正常return或者说return 登录页什么的。
## 属性代理

把变的部分（组件和获取数据的方法） 抽离到外部作为传入，从而实现页面的复用。


## 反向继承
1. 使用一个函数接受一个组件作为参数传入，并返回一个继承了该传入组件的类组件，且在返回组件的 render() 方法中返回 super.render() 方法
2. 相较于属性代理方式，使用反向继承方式实现的高阶组件的特点是允许高阶组件通过 this 访问到原组件，所以可以直接读取和操作原组件的 state/ref/生命周期方法。
3. 可以获取到传入组件实例的 render 结果，进而可对传入组件进行渲染劫持（最大特点）常见的场景是显示加载元素
```js
function withLoading(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            if(this.props.isLoading) {
                return <Loading />;
            } else {
                return super.render();
            }
        }
    };
}
```
通过高阶函数中继承原组件的方式，劫持修改 render 函数，篡改返回修改，达到显示 Loading 的效果。

高阶组件的props都是直接透传下来，无法确定子组件的props的来源。
可能会出现props重复导致报错。
组件的嵌套层级太深,props的来源难确定。
会导致ref丢失。









## Hook 会替代高阶组件吗？
Hook 的出现使得原本许多很别扭的写法变得轻松，最典型的就是它可以取代掉 class 生命周期中大多数的功能，把更相关的逻辑放在一起，而非零散在各个生命周期实例方法中。