axios是通过Promise实现对ajax技术的一种封装，就像jquery对ajax的封装一样，简单来说就是ajax技术实现了局部数据的刷新，axios实现了对ajax的封装，

> 注： 传统Ajax 指的是 XMLHttpRequest（XHR），axios和jQuer ajax都是对Ajax的封装。

## ajax
Ajax是对原生XHR的封装，一种基于原生JavaScript的技术，用于在不刷新整个页面的情况下与服务器进行异步通信。。由客户端请求ajax引擎，再由ajax引擎请求服务器，服务器作出一系列响应之后返回给ajax引擎，由ajax引擎决定将这个结果写入到客户端的什么位置。实现页面无刷新更新数据。

## ajax优缺点
优点　
1、无刷新更新数据
2、异步与服务器通信
3、前端和后端负载平衡
4、基于标准被广泛支持
5、界面与应用分离

缺点：
1、ajax不能使用Back和history功能，即对浏览器机制的破坏。
2、安全问题 ajax暴露了与服务器交互的细节
3、对收索引擎的支持比较弱
4、破坏程序的异常处理机制
5、违背URL和资源定位的初衷
6、ajax不能很好的支持移动设备
7、太多客户端代码造成开发上的成本

## axios
Axios是一个第三方库,一个基于Promise的HTTP客户端，用于在浏览器和Node.js中发送HTTP请求。简洁和易用的方式进行异步请求

优点：
1、基于 Promise：支持 Promise，处理异步操作更简洁，避免了回调地狱。
2、拦截器：提供请求和响应拦截器，方便进行请求前和响应后的统一处理。
3、支持请求和响应数据的转换：可以在请求或响应之前对数据进行转换。
4、广泛的浏览器兼容性：包括对旧版 IE 的支持。
5、取消请求：支持取消请求的功能。

缺点：
1、比fetch体积大
2、需要引入外部库，而不是内置在浏览器中的功能。


## fetch: 
现代浏览器中内置的接口，用于发起 HTTP 请求。它是 XMLHttpRequest 的现代替代品，基于 Promise 实现。

优点：
1、现代 API：基于 Promise，更加现代和简洁。
2、内置于浏览器：无需引入外部库，减少了依赖。
3、可读性高：代码更加简洁，易于阅读和编写。
4、支持流操作：可以处理响应数据的流（Stream），适用于处理大文件。

缺点：
1、浏览器兼容性：不支持旧版浏览器，如 IE11 及以下。
2、不自动处理错误：默认情况下，Fetch 只在网络故障时抛出错误，不会对 HTTP 状态码进行处理。
3、不提供拦截器：不像 Axios 提供拦截器功能，需要手动实现。

### 差异
1. 错误处理
ajax处理逻辑相对复杂，要检查readyState和status
axios 可以直接catch
fetch 也是手动检查resp.ok

2. 取消请求
ajax 可以 .abort()取消
axios 可以CancelToken取消 
```js
const source = axios.CancelToken.source();
source.cancel()
```
fetch 不支持取消， 但是可以用AbortController() 
```js
const controller = new AbortController();
const signal = controller.signal;
fetch('https://api.example.com/data', { signal })
```

3. 拦截器
ajax没有内置拦截器
axios提供请求和响应拦截器
```js
axios.interceptors.request.use
axios.interceptors.response.use
```
fetch没有，需要手动封装

4. 并行请求
Ajax 手动管理
axios 内置支持并行请求
```js
axios.all([
  axios.get('https://api.example.com/data1'),
  axios.get('https://api.example.com/data2')
])
```
fetch  Promise.all 处理并行请求

5. 处理不同数据格式
ajax 可以处理不同的数据格式，但需要手动解析。 var response = JSON.parse(xhr.responseText); // 处理 JSON
axios 自动解析json响应 可以通过 transformResponse 自定义解析逻辑。
fetch 需要手动解析   res.json()