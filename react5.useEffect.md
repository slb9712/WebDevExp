## 副作用：
如果一个函数或其他操作修改了其局部环境之外的状态变量值，那么它就被称为有副作用。副作用是相对于主作用来说的，一个功能（比如，函数）除了主作用，其他的作用就是副作用。对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）。
常见的副作用（side effect）：数据（Ajax）请求、手动修改 DOM、localStorage 操作等

## 在React中，useEffect 和 useMemo 的依赖项数组使用的是浅层引用（浅比较）来检查依赖项是否发生了变化。这意味着当你提供一个对象作为依赖项时，React只会比较对象的引用，而不会递归地比较对象内部的属性。因此，如果对象的引用发生了变化，即使对象内部的属性没有发生变化，useEffect 和 useMemo 也会认为依赖项发生了变化，从而重新执行副作用或重新计算值。如果你需要根据对象内部的属性变化来触发useEffect 或 useMemo，你可以将对象的属性展开到依赖项数组中，而不是将整个对象作为依赖项

深比较 useDeepCompareEffect

# useEffect中的清理函数（在组件卸载或依赖重新执行副作用函数之前执行）

## useEffect(function, array)介绍
useEffect可以让你在函数组件中执行副作用（数据获取、设置订阅、手动更改React组件中的DOM都属于副作用）
useEffect在初次完成渲染之后都会执行一次, 配合第二个数组参数可以模拟类的一些生命周期。
useEffect可以认为是React ClassComponent的生命周期函数componentDidMount、componentDidUpdate、componentWillUnmount的组合。
 
使用useEffect实现Class组件常用生命周期：
```ts
一、componentDidMount：
useEffect(() =  {

// to do 

},[]) //空数组时只在挂载和卸载才会执行，useEffect相当于class组件里面componentDidMount，componentWillUnmoun。也相当于ahooks里面的useMount。


二、componentDidMount + 有条件的componentDidUpdate：
useEffect(() =  {
// to do 
}, [a, b]); //只要数组元素变化就执行函数。有多个元素，只要有一个变化就执行函数。同时组件初始化时也会执行。
```
备注：ahooks中的use UpdateEffect，使用上与useEffect完全相同，只是它忽略了首次渲染，且只在依赖项更新时运行。
```ts


三、componentDidMount + componentDidUpdate：

useEffect(() =  {
// to do 
}) //组件初始化和更新都会执行。相当于componentDidMount+componentDidUpdate


四、componentWillUnmount：useEffect的清除
useEffect(() =>  {

return ()=  {

// to do，函数体为组件初始化或变化时执行的代码，返回值为组件销毁前执行的代码

};

},[]）


function  useOnResize (fn) {
    useEffect(() => {
        window.addEventListener('resize',fn);
        return () => {
            window.removeEventListener('resize',fn)
        }
    }, []);
}

// useEffect异步更新。通过useRef（state）获取引用，current获取最新值
const handleClick = () => {
    console.log("value1: ", count)
    setCount(count + 1)
    console.log("value2: ", count)
    setCount(count + 1)
    console.log("value3: ", count)
}
// console.log('0') 打印全是0，页面上只是1。如果我们传入的是一个普通值，他只会进行最后一次更新
const handleClick = () => {
    console.log("value1: ", count)
    setCount(count => count + 1)
    console.log("value2: ", count)
    setCount(count => count + 1)
    console.log("value3: ", count)
}
// console.log('0') 打印全是0，页面是2。传入一个函数的话，它会进行两次赋值，因为它更新的值是基于之前的值来执行，所以在开发中推荐使用函数传入的形式进行修改；


const [state, setState] = useState(0)
useEffect(() => {
    setState(state + 1)
}, [])
useEffect(() => {
    console.log(state)
    cosnole.log('1执行')
    return () => {
        console.log('1销毁')
    }
}, [state])

useEffect(() => {
    cosnole.log('2执行')
    return () => {
        console.log('2销毁')
    }
}, [state])

// useEffect中的清理函数（在组件卸载或依赖重新执行副作用函数之前执行）只有在下一次useEffect执行或组件卸载时才会运行。所以，在这个例子中，'1销毁'和'2销毁'只会在state再次变化或组件卸载时打印。
// 总结：这段代码的执行结果将是在首次渲染后，state变为1，然后打印'1执行'和'2执行'。在下一次状态改变或组件卸载之前，不会打印'1销毁'或'2销毁'。

```
### useEffect清除的作用：
1. 不更新已卸载组件的状态
一种常见的实现是在异步功能完成后更新组件状态。示例：有一个异步函数，该函数执行一些操作，并且在运行时要呈现“正在加载”消息。函数完成后，将更改“正在加载”的状态并渲染另一条消息。

1function Example(props) {
2
3const [loading, setLoading] = useState(true)
4
5useEffect(() =  {
6
7fetchAPI.then(() =  {
8
9setloading(false);
10
11});
12
13}, []);
14
15return  ;div {loading ?  ;p loading... ;/p> : <p>Fetched!!</p } ;/div>
16
17}
但是，如果我们退出组件并且fetchAPI结束并设置了加载状态，这将提示错误。因此，需要确保fetchAPI完成后仍可以装入该组件。
1function Example(props) {
2	const [loading, setloading] = useState(true)
3	useEffect(() =  {
4		let mounted = true;
5		fetchAPI.then(() =  {
6			if (mounted)  setloading(false);
7		})
8		return function cleanup() {
9			mounted = false
10		};
11	}, [])
12	return  ;div {loading ?  ;p loading... ;/p> : <p>get data!!</p } ;/div>
13}
这样，可以询问组件是否仍然安装。只需添加一个变量，如果我们卸载该变量，该变量将变为false。
2. 取消api请求。可以在api请求结束之前完成请求。除了清除功能以外，这还可以防止内存泄漏。
1useEffect(() =  {
2	const fetchData = async () =  {
3		try {
4			await apiRequest.get('/users', {
5				// ...
6			});
7		} catch (error) {
8			throw error;
9		}
10	}
11	fetchData();
12	return () =  {
13		apiRequest.cancel();
14	}
15}, []);
3. 清除定时器和事件监听
1useEffect(
2    () =  {
3      const isSupported = element && element.addEventListener;
4      if (!isSupported) return;
5      const eventListener = event =  saveHandler.current(event);
6      // 添加事件监听
7      element.addEventListener(eventName, eventListener);
8      // 清除的时候移除事件监听
9      return () =  {
10        element.removeEventListener(eventName, eventListener);
11      };
12    }, [element] // 如果element变化，就再次运行
13  ); 
14
15// 清除定时器
16const timer= useRef();
17
18useEffect(() =  {
19    ...
20   return ()=  {
21      clearInterval(timer.current);
22    };
23  }, []);
一个组件中可以使用多个useEffect，可以按照代码的用途分离他们。按照 effect 声明的顺序依次调用组件中的每一个effect。
1function myExample() {
2  useEffect(() =  {
3    // ...
4  });
5  useEffect(() =  {
6    // ...
7  });
8   useEffect(() =  {
9    // ...
10  });
11  return (
12     ;div 666 ;/div>
13  );
14}
15export default myExample;
useEffect内部是不能直接用 async await语法的
// 不能这样使用
useEffect(async ()=>{
         const res = await getData()
},[]);
useEffect 的回调参数返回的是一个清除副作用的 clean-up 函数。因此无法返回 Promise，更无法使用 async/await
可以使用如下方法在useEffect中使用async await：
1const App = () =  {
2	useEffect(() =  {
3		(async function getData() {
4			await requestApi();
5		})();
6	}, []);
7	return  ;div 666 ;/div>;
8};
 
1useEffect(() =  {
2	const getData = async () = {
3		const data = await requestApi();
4		setData(data);
5	};
6	getData();
7}, []);
