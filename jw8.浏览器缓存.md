## 为什么要缓存
优点：
缓存可以减少用户等待时间，提升用户体验；
减少网络带宽消耗
降低服务器压力；
缺点：
缓存使用不当，会有「脏数据」，导致用户数据异常。


 ## 强缓存
服务器端可以设置。

在缓存数据未失效的情况下，可以直接使用缓存数据；在没有缓存数据的时候，浏览器向服务器请求数据时，服务器会将数据和缓存规则一并返回，缓存规则信息包含在响应header中。

设置：
1.expires(http/1.0,时间格式GMT)
  表示缓存过期时间。缺点：生成的是绝对时间，但是客户端时间可以随意修改，会导致误差。
2.cache-control(http/1.1,单位 秒） 优先级高于Expires
  1.max-age(表示缓存内容在 xx秒后失效)
  2.no-cache(要根据协商缓存验证缓存数据)
  3.no-store(所有内容都不会被缓存)
  4.public(所有内容都将被缓存包括客户端和代理服务器)
  5.private(所有内容只有客户端可以缓存)
  6.s-maxage(只用于共享缓存和max-age效果一样，只是max-age用于普通缓存)

Expires和Cache-Control决定了浏览器是否要发送请求到服务器，ETag和Last-Modified决定了服务器是要返回304+空内容还是新的资源文件。

强缓存会有3种命中模式：from memory cache与from disk cache，资源本身的大小(如：1.5k)


## 协商缓存
协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程

设置：
1.Last-Modified和if-Modified-Since
  Last-Modified:浏览器第一次请求的时候，服务器响应请求，返回请求资源，和Last-Modified标记请求的资源在服务器端最后的修改时间。响应200
  if-Modified-Since:之后请求同一个资源时，浏览器会向服务器传送if-Modified-Since，就是上次请求时服务器返回的最后修改时间，询问这个时间之后有没有被修改过。如果没有变化，返回304状态码，内容为空。客户端从本地缓存读取资源。如果发生改变，返回200状态吗，新的内容，客户端更新本地缓存。

  缺点：Last-Modified 标注的最后修改时间只能精确到秒，如果有些资源在一秒之内被多次修改的话，他就不能准确标注文件的新鲜度了。

2.ETag和if-None-Match （优先级高于Last-Modified / If-Modified-Since）
  ETag：请求资源时，给资源计算得出的一个唯一标志符。
  if-None-Match:再次请求服务器时，浏览器将ETag值传入if-None-Match中，服务端匹配传入的值与上次是否一致，如果一致返回304，否则返回新资源和新的ETag

##  缓存判断顺序
强制缓存优先于协商缓存进行，
先判断Cache-Control，在Cache-Control的max-age之内，直接返回200 from cache；
没有Cache-Control再判断Expires，再Expires之内，直接返回200 from cache；
Cache-Control=no-cache或者不符合Expires，浏览器向服务器发送请求；
服务器同时判断ETag和Last-Modified，都一致，返回304，有任何一个不一致，返回200，新的资源


## 如何清除强缓存呢？
答案：有几种方案可以选。
ctrl+F5
浏览器隐身模式
chrome在network标签下禁止缓存
在开发阶段，给资源加上一个动态的参数，如css/index.css?v=0.0001，由于每次资源的修改都要更新引用的位置，同时修改参数的值。
如果缓存问题出现在ajax请求中，最有效的解决办法就是ajax的请求地址追加随机数；

## 强制更新缓存
html 文件 Cache-Control 设置 no-cache，其他文件 max-age，这样入口文件会用本地缓存但每次都协商，能及时更新。
强制刷新的实现原理就是设置了 Cache-Control 为 no-cache
