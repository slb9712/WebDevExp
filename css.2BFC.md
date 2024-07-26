## 定义：
块级格式化上下文
独立的渲染区域，不会影响边界外的元素 
边距重叠的解决方案

## 形成条件： 
1. float  值不是none
2. position 值不是static或者relative
3. overflow 值不是visible
4. display 

## 布局规则： 
1. 区域内box从上到下排列 
2. box垂直方向的距离由margin决定 
3. 同一个bfc内box margin会重叠 
4. bfc不会与float重叠 
5. bfc计算高度 也会计算浮动子元素

## 作用：清除浮动
常使用的清除浮动的BFC方式只有`overflow:hidden`,原因是使用float或者position方式清除浮动，虽然父级盒子内部浮动被清除了，但是父级本身又脱离文档流了，会对父级后面的兄弟盒子的布局造成影响。如果设置父级为`display:flex`，内部的浮动就会失效。

## 补充： 
1. FFC（Flex formatting contexts）：自适应格式上下文。display值为flex或者inline-flex的元素将会生成自适应容器。
2. GFC（GrideLayout formatting contexts）：网格布局格式化上下文。当为一个元素设置display值为grid的时候
3. IFC（Inline formatting contexts）：内联格式上下文。