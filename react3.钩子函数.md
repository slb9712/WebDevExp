 React hooks主要是为了解决ClassComponent的问题：
1.	很难复用逻辑（只能用高阶组件HOC或props），会导致组件树层级很深
2.	会产生复杂庞大的组件（很多代码必须写在class里面），FunctionalComponent则可以小而美
3.	class组件方法需要bind，this指向不明确，理解成本更高
4.	写成FunctionalComponent更容易理解，函数式编程（传入数据、返回UI的函数）


### 常见钩子
1. useState
作用是用来声明状态变量，声明方式
const [ count , setCount ] = useState(0);
等价于
let _useState = userState(0)
let count = _useState[0]
let setCount = _useState[1]
2. useEffect
作用代替生命周期函数，使用时需要注意
1、React首次渲染和之后的每次渲染都会调用一遍useEffect函数，首次渲染对应(componentDidMonut)和更新渲染对应(componentDidUpdate)
2、useEffect中定义的函数的执行是异步执行的，componentDidMonut和componentDidUpdate中的代码都是同步执行的
3、useEffect的第二个参数数组，可以实现（componentWillUnmount）生命周期， 数组中可以录入很多的状态变量，当数组中的状态值发生改变时，进行解绑; 当传入空数组[], 表明只有组件被销毁时才进行解绑。

useEffect可以让你在函数组件中执行副作用（数据获取、设置订阅、手动更改React组件中的DOM都属于副作用）
useEffect在初次完成渲染之后都会执行一次, 配合第二个数组参数可以模拟类的一些生命周期。
useEffect可以认为是React ClassComponent的生命周期函数componentDidMount、componentDidUpdate、componentWillUnmount的组合。


3. useContext
作用跨越组件层级传递变量，实现共享，解决组件间值传递问题
使用示例
1、创建共享上下文树
import React, { useState , createContext } from 'react';
import Counter from './Counter';
//===关键代码
const CountContext = createContext()

function Example(){
    const [ count , setCount ] = useState(0);

    return (
        &lt;div&gt;
            &lt;p&gt;You clicked {count} times&lt;/p&gt;
            &lt;button onClick={()=&gt;{setCount(count+1)}}&gt;click me&lt;/button&gt;
            {/*======关键代码 ，创建上下文树*/}
            &lt;CountContext.Provider value={count}&gt;
                 &lt;Counter /&gt;
            &lt;/CountContext.Provider&gt;

        &lt;/div&gt;
    )
}
export default Example;
2、接收上下文数据
function Counter(){
    const count = useContext(CountContext)  
    return (&lt;h2&gt;{count}&lt;/h2&gt;)
}
4. useReducer
作用实现类似redux的功能
import React, { useReducer } from 'react';

function ReducerDemo(){
    const [ count , dispatch ] =useReducer((state,action)=&gt;{
        switch(action){
            case 'add':
                return state+1
            case 'sub':
                return state-1
            default:
                return state
        }
    },0)
    return (
       &lt;div&gt;
           &lt;h2&gt;现在的分数是{count}&lt;/h2&gt;
           &lt;button onClick={()=&gt;dispatch('add')}&gt;Increment&lt;/button&gt;
           &lt;button onClick={()=&gt;dispatch('sub')}&gt;Decrement&lt;/button&gt;
       &lt;/div&gt;
    )

}

export default ReducerDemo
5. useMemo
作用优化无用渲染的性能问题
以下示例中，在未用useMemo进行优化的情况下，expensive函数都会执行；优化后只有当依赖的count变化时执行
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() =&gt; {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i &lt; count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
 
    return &lt;div&gt;
        &lt;h4&gt;{count}-{expensive}&lt;/h4&gt;
        {val}
        &lt;div&gt;
            &lt;button onClick={() =&gt; setCount(count + 1)}&gt;+c1&lt;/button&gt;
            &lt;input value={val} onChange={event =&gt; setValue(event.target.value)}/&gt;
        &lt;/div&gt;
    &lt;/div&gt;;
}
5. useCallback
useCallback跟useMemo比较类似，但它返回的是缓存的函数
const fnA = useCallback(fnB, [a])
 
 
