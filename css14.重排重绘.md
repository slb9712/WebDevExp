## 重绘和回流？
  
**回流  reflow**：
本质就是重新计算 layout 树。

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

浏览器在反复权衡下，最终决定获取属性立即 reflow。
1. 添加或删除可见的DOM元素
2. 元素位置改变
3. 元素本身的尺寸发生改变
4. 内容改变
5. 页面渲染器初始化
6. 浏览器窗口大小发生改变

浏览器将会使渲染树中受到影响的部分失效，重新构造渲染树，发生回流

**重绘**：
本质就是重新根据分层信息计算了绘制指令。
当改动了可见样式后，就需要重新计算，会引发 repaint。
元素的颜色外观发生变化，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观，发生重绘
  
重绘不一定回流，回流一定重绘

## 如何减少重绘和重排
1. 减少直接操作dom元素，改用className用于控制

一个Dom频繁使用JS修改样式时，可以选择事先在css文件中定义一个选择器，在其内部放置好我们需要更新的CSS样式，然后在我们需要的时候，直接更换选择器的值，就可以将所有对样式的调整整合为一次修改。

2. 尽量减少table使用，table属性变化使用会直接导致布局重排或者重绘

3. 当dom元素position属性为fixed或者absolute, 可以通过css形变触发动画效果，此时是不会出发reflow的

4. 批量修改dom
批量修改DOM元素的核心思想是：

让该元素脱离文档流，对其进行多重改变，将元素带回文档中

5. 如果需要创建多个DOM节点，可以使用DocumentFragment创建完后一次性的加入document