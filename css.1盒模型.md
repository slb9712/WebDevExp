## 盒模型
标准盒模型用:box-sizing:content-box; 将采用标准模式的盒子模型标准
标准盒模型:一个块的总宽度(页面中占的宽度)= content width + margin(左右) + padding(左右) + border(左右)。 高度同理

怪异盒模型用:box-sizing:border-box; 将采用怪异模式的盒子模型标准
怪异盒模型:一个块的总宽度= content width（已经包含了padding和border值） + margin(左右)（IE浏览器）

box-sizing:inherit 父元素继承box-sizing的属性值

## 怎么获取盒子宽高？
1. dom节点的style样式
`element.style.width //只能获取行内样式，不能获取内嵌的样式和外链的样式。`
2.  通用型
`window.getComputedStyle(element).width` 
3. IE独有的
`element.currentStyle.width`
4. 获取一个元素的绝对位置。绝对位置是视窗 viewport 左上角的绝对位置。此 api 可以拿到四个属性：left、top、width、height。
`element.getBoundingClientRect().width`



## 边距重叠： 
两个box如果都设置了边距，那么在垂直方向上，两个box的边距会发生重叠，以绝对值大的那个为最终结果显示在页面上。
行内元素inline和行内块级元素inline-block不会发生边距塌陷，因为它们不能设置垂直边距。

有两种边距重叠的情况：
父子关系的边距重叠： 解决办法给子元素或父元素创建BFC。

父子关系，如果子元素设置了外边距，在没有把父元素变成BFC的情况下，父元素也会产生外边距
给父元素添加 overflow：hidden
这样父元素就变为 BFC，不会随子元素产生外边距

同级兄弟关系的重叠
同级元素在垂直方向上外边距会出现重叠情况，最后外边距的大小取两者绝对值大的那个

## margin塌陷解决
实质就是触发盒子的bfc（block format context块级格式化上下文）来改变父级元素的渲染规则

方法一
position:absolute;
设置相对定位
通过给父元素增加一个相对定位的属性来解决margin塌陷问题

方法二
display:inline-block；
设置成行块级元素

方法三
float:left和float:right;
利用浮动来改变样式

方法四
overflow:hidden
溢出盒子的部分隐藏展示