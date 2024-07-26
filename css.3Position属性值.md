## pisition属性
1. position: relative;相对定位

1> 不影响元素本身特性（无论区块元素还是内联元素会保留其原本特性）

2> 不会使元素脱离文档流（元素原本位置会被保留，即改变位置也不会占用新位置）

3> 没有定位偏移量时对元素无影响（相对于自身原本位置进行偏移）

4>提升层级（用z-index样式的值可以改变一个定位元素的层级关系，从而改变元素的覆盖关系，值越大越在上面，z-index只能在position属性值为relative或absolute或fixed的元素上有效。）  （两个都为定位元素，后面的会覆盖前面的定位）

2. position: absolute;绝对定位

1> 使元素完全脱离文档流（在文档流中不再占位）

2> 使内联元素在设置宽高的时候支持宽高（改变内联元素的特性）

3> 使区块元素在未设置宽度时由内容撑开宽度（改变区块元素的特性）

4> 相对于最近一个有定位的父元素偏移（若其父元素没有定位则逐层上找，直到document——页面文档对象）

5> 相对定位一般配合绝对定位使用（将父元素设置相对定位，使其相对于父元素偏移）

6> 提升层级（同相对定位）

3. position: fixed;固定定位

  fixed生成固定定位的元素，相对于浏览器窗口进行定位。

4. position:static：默认值

默认布局。元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。

5. position: sticky 粘性定位

粘性定位，该定位基于用户滚动的位置。

它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。

注意: Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix 。

6. position: inherit

规定应该从父元素继承 position 属性的值。

7. posiyion: initial

设置该属性为默认值，详情查看CSS initial 关键字

initial 关键字用于设置 CSS 属性为它的默认值。

initial 关键字可用于任何 HTML 元素上的任何 CSS 属性。 
