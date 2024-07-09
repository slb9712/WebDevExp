## 为什么要对axios进行二次封装？
答：主要是要用到请求拦截器和响应拦截器;
请求拦截器：可以在发请求之前可以处理一些业务
响应拦截器：当服务器数据返回以后，可以处理一些事情，携带token，token过期，`CancelToken取消请求

```js
import axios from "axios";
// 创建axios对象
const Server = axios.create({
  baseURL: "", //后端接口地址
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// 前置拦截器
Server.interceptors.request.use(
  (config) => {
    if (localStorage.Authorization) {
      config.headers.Authorization = getLocalStorage("Authorization");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 后置拦截器
Server.interceptors.request.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.data.code == 401) {
      //token过期或没传token 需要重新登陆获取token
      window.location.href = "http://localhost:8080/"; //改为线上地址
    }
    return Promise.reject(error);
  }
);
// 抛出对象信息
export default Server;
```