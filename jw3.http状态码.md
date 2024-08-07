1xx	    Information（信息状态码）	          接受的请求正在处理
2xx	    Success（成功状态码）	              请求正常处理完毕
3xx	    Redirection（重定向状态码）	        需要进行附加操作以完成请求
4xx	    Client Error（客户端错误状态码）	  服务器无法处理请求
5xx	    Server Error（服务端错误状态码）	  服务器处理请求出错

200     表示请求在服务器端被正常处理了

301     状态码表示请求的资源已经分配了新的URI，以后请求该资源应该访问新的URI
302     表示请求的资源已经被分配了新的URI，希望客户端本次能使用新的URI访问
304     服务端已经执行了GET，但文件未变化(客户端发送了一个带条件的GET 请求且该请求已被允许，而文档的内容并没有改变)

400     状态码表示请求报文中存在语法错误
401     状态码表示发送的请求需要有通过 HTTP 认证
403     状态码表明对请求资源的访问被服务器拒绝了
404     是我们最常见的状态码之一，它表示服务器上无法找到请求资源。

500 状态码表明服务器端在执行请求时发生了错误。
503 状态码表明服务器暂时处于超负载或正在进行停机维护

## http无状态
服务器不保留与客户交易时的任何状态
## 无状态性带来的问题
用户登录后，切换到其他界面，进行操作，服务器端是无法判断是哪个用户登录的。 每次进行页面跳转的时候，得重新登录。

## 怎么有状态
1. Cookie
Cookie 是客户端的存储空间，由浏览器来维持。具体来说 cookie 机制采用的是在客户端保持状态的方案

Cookie 的实现过程：

Cookie 会根据从服务器端发送的响应报文内的一个叫做 Set-Cookie 的首部字段信息，通知客户端保存 Cookie，当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入 Cookie 值后发送出去。
也就是 Cookie 是服务器生成的，但是发送给客户端，并且由客户端来保存。每次请求加上 Cookie就行了。

2. Session

另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上。
客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时，只需要从该 Session 中查找该客户的状态就可以了。

## Cookie 和 Session 的区别
（1）Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上；

（2）Cookie 不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗，考虑到安全应当使用 Session ；

（3）Session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能。考虑到减轻服务器性能方面，应当使用COOKIE；

（4）单个Cookie 在客户端的限制是3K，就是说一个站点在客户端存放的COOKIE不能超过3K；