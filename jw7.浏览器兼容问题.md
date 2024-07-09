## 浏览器兼容性问题产生原因
 因为不同浏览器使用内核及所支持的HTML等网页语言标准不同；以及用户客户端的环境不同（如分辨率不同）造成的显示效果不能达到理想效果。最常见的问题就是网页元素位置混乱，错位，显示不出。


1. 不同浏览器标签默认的外边距和内边距不同
*{margin:0px; padding:0px}。

2. 块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。
在float的标签样式中加入:display:inline;将其转化为行内属性。

3. 图片默认有间距。
使用float为img布局。

4. 设置较小高度标签（一般小于10px），在IE6、IE7，遨游中高度超出自己设置的高度。
给超出高度的标签设置overflow:hidden;或者设置行高line-height小于你设置的高度。

5. 行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，IE6间距bug。

在display:block;后面加入display:inline;display:table;