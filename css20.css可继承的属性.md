行内元素和块级元素的区别

　　1、 行内元素不会占据整行，在一条直线上排列，都是同一行，水平方向排列；

　　　　块级元素会占据一行，垂直方向排列。

　　2、 块级元素可以包含行内元素和块级元素；行内元素不能包含块级元素。

　　3、 行内元素与块级元素属性的不同，主要是盒模型属性上，行内元素设置width无效，height无效(可以设置line-height)，margin上下无效，padding上下无效。


img等是置换元素，置换元素就是浏览器根据元素的标签和属性来决定元素的具体显示内容。
img input select textarea button label 等，他们被称为可置换元素


（1）字体系列属性
font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust

（2）文本系列属性
text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、
text-transform、direction、color

（3）表格布局属性
caption-side border-collapse empty-cells

（4）列表属性
list-style-type、list-style-image、list-style-position、list-style

（5）光标属性
cursor

（6）元素可见性
visibility

（7）还有一些不常用的；speak，page，设置嵌套引用的引号类型quotes等属性