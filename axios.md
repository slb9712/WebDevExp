## 拦截器原理
1. 请求拦截器用于在接口请求之前做的处理，比如为每个请求带上相应的参数（token，时间戳等）。 
2. 响应拦截器用于在接口返回之后做的处理，比如对返回的状态进行判断（token是否过期）。


创建一个chn数组，数组中保存了拦截器相应方法以及dispatchRequest（dispatchRequest这个函数调用才会真正的开始下发请求），把请求拦截器的方法放到chn数组中dispatchRequest的前面，把响应拦截器的方法放到chn数组中dispatchRequest的后面，把请求拦截器和相应拦截器forEach将它们分unshift,push到chn数组中，为了保证它们的执行顺序，需要使用promise，以出队列的方式对chn数组中的方法挨个执行。