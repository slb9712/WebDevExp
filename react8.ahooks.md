ahooks 是一个 React Hooks 库，提供了React hooks没有提供的常用且高质量的自定义Hooks。
ahooks是通过自定义Hooks，将组件逻辑提取到可重用的函数中，从而提供给使用者。
// ahooks 的引入方式 
import { useRequest } from 'ahooks';
### 1、useRequest
（1）自动请求/手动请求/依赖请求/手动暂停请求
1 const { data: list, run: listRequest } = useRequest(	//	不设置manual和run则是自动请求
2    async () =&gt; {
3      const resp = await getData();
4      return resp;
5    },
6    {
7      manual: true,    // 通过设置options.manual=true , 则需要手动调用run时才会触发执行异步函数
8    },
9  );
10
11  useEffect(() =&gt; {
12    if(someThing){
13    	listRequest();
14    }
15  }, []);
16
17
18const { data, run, cancel } = useRequest(	// 手动暂停请求：cancel
19    async () =&gt; {
20      const resp = await getData();
21      return resp;
22    },
23    {
24      ready: Boolean(isOk),		//ready接收一个布尔值，只有ready的值变为true时，才会发起请求，即是依赖请求
25    },
26  );
（2）请求成功或失败后的操作回调
1  const { data } = useRequest(
2    async params =&gt; {
3      const resp = await getData(params);
4      return resp;
5    },
6    {
7      onSuccess: res =&gt; { 	//onError是失败回调函数
8		// 请求成功
9      },
10    },
11  );
（3）请求过程中的loading
1const { data: dataList,loading } = useRequest(
2	async () =&gt; {
3		const resp = await getData();
4		return resp;
5	}
6);
 
（4）当请求未返回时，默认的data数据
1const { data } = useRequest(
2	async params =&gt; {
3		const resp = await getData(params);
4		return resp;
5	},
6	{
7		initialData:[],
8	},
9);
 
（5）请求参数变化触发接口请求：refreshDeps
refreshDeps参数变化会触发重新执行请求，只适用于简单情况，当需要经过一些判断再触发请求时，建议还是放在useEffect中
1const { data } = useRequest(
2	async params =&gt; {
3		const resp = await getData(params);
4		return resp;
5	},
6	{
7		refreshDeps: [state1, state2],
8	},
9);

注意：默认会自动请求一次，当依赖多个参数时，并不会合并参数的变化发起请求

（6）格式化返回的结果：formatResult
1const { data } = useRequest(
2	async params =&gt; {
3		const resp = await getData(params);
4		return resp;
5	},
6	{
7		formatResult: res =&gt; {
8			const list = [];
9			res.forEach(item =&gt; {
10				list.push(item.id);
11			});
12			return list;
13		},
14	},
15);

（7）直接修改接口返回的data数据：mutate
mutate：可能只截取一部分的data或根据接口返回的数据，自定义返回内容。
1const { data,mutate } = useRequest(
2	async params =&gt; {
3		const resp = await getData(params);
4		return resp;
5	},
6	{
7		onSuccess: res =&gt; {
8			mutate([{ id: 111, name: 'test' }]);
9		},
10	},
11);

（8）自动执行 run 的时候，默认带上的参数：defaultParams
只适用于初始 + 自动请求带的参数
1const { data } = useRequest(
2	async params =&gt; {
3		const resp = await getData(params);
4		return resp;
5	},
6	{
7		defaultParams: [{ id: defaultList }],
8	},
9);
10
11
12const { data } = useRequest(
13	async () =&gt; {
14		const resp = await getData({ id: defaultList });
15		return resp;
16	},
17);
 
（9）屏幕聚焦，重新发起请求，refreshOnWindowFocus
默认为false，如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。
1const { data } = useRequest(
2	async params =&gt; {
3		const resp = await getData(params);
4		return resp;
5	},
6	{
7		refreshOnWindowFocus: true
8	},
9);
10// focusTimespan: 屏幕重新聚焦，如果每次都重新发起请求不是很好，需要有一个时间间隔，在当前时间间隔内，不会重新发起请求,需要配置refreshOnWindowFocus使用，默认：5000。
11const { data } = useRequest(
12	async params =&gt; {
13		const resp = await getData(params);
14		return resp;
15	},
16	{
17		refreshOnWindowFocus: true,
18		focusTimespan:10000,
19	},
20);

（10）接口防抖：debounceInterval / 节流：throttleInterval
1// 适用于多次手动频繁请求run，设置的防抖拦截，最后一次请求发起后的n秒后，才会发起真正的接口请求
2const { data, run,cancel } = useRequest(
3	async () =&gt; {
4		const resp = await getData();
5		return resp;
6	},
7	{
8		manual: true,
9		debounceInterval: 500,
10	},
11);
12
13// 适用于多次手动频繁请求run，设置的节流拦截，一定时间内只触发一次接口请求
14const { data, run,cancel } = useRequest(
15	async () =&gt; {
16		const resp = await getData();
17		return resp;
18	},
19	{
20		manual: true,
21		throttleInterval: 500,
22	},
23);

（11）轮询请求：pollingInterval
设置后会进入轮询模式，定时触发函数执行
1const { data, run,cancel } = useRequest(
2	async () =&gt; {
3		const resp = await getData();
4		return resp;
5	},
6	{
7		pollingInterval: 500,
8	},
9);
10
11
12// pollingWhenHidden:屏幕隐藏时是否会继续轮询，默认为 true，当屏幕不可见时，再发起轮询任务就很浪费，可以设置，当屏幕不可见，暂停定时任务
13const { data, run,cancel } = useRequest(
14	async () =&gt; {
15		const resp = await getData();
16		return resp;
17	},
18	{
19		pollingInterval: 500,
20		pollingWhenHidden: false
21	},
22);
 
### 2、useMount
只在组件挂载时执行
在组件首次渲染时，执行方法。
useMount(() => {
     // to do
});
等同于初次加载的useEffect没有依赖的时候:
        useEffect(() => {
            // to do
        }, []);
### 3、useClickAway
管理目标元素外点击事件
1const ref = useRef&lt;HTMLSpanElement&gt;();
2useClickAway(() =&gt; {
3   setCount(s =&gt; s + 1);
4}, ref);
5
6// 支持多个DOM
7const ref1 = useRef();
8const ref2 = useRef();
9useClickAway(() =&gt; {
10    setCount(s =&gt; s + 1);
11}, [ref1, ref2]);
### 4、useUnmount
只在组件卸载时，执行方法。可以在卸载时，处理事件监听和取消定时器等一些操作
useUnmount(() => {
    // to do
});
### 5、 useUpdateEffect
只在依赖更新时执行
useEffect无论是否有依赖项，首次渲染都会执行函数，为了避免首次渲染执行，需要用if 判断来拦截。
useUpdateEffect在使用上同useEffect完全一样，只是它忽略了首次渲染，且只在依赖项变化时进行运行。
useUpdateEffect(() => {
    //to do
}, [a, b]);
