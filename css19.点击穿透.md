## 点击穿透

PC端的点击行为可以拆解为 mousedown -> mouseup -> click 三步。


移动端的触摸事件过程为  touchstart -> touchmove -> touchend

在 touchend 之后会等待约 300ms ，如果没有 tap 行为，则触发 click 事件。 而浏览器等待约 300ms 的原因是，判断用户是否是双击（double tap）行为
由于click事件的滞后性（300ms），在这300ms内上层元素隐藏或消失了，下层同样位置的DOM元素触发了click事件，看起来就像点击的target“穿透”到下层去了。

## 解决方法

1. 触摸结束时 touchend 事件触发时，preventDefault()。不是所有的浏览器都支持。
```js
.addEventListener('touchend',(e)=>{
    e.preventDefault()                  // 阻止默认事件后，将不再触发触摸后的点击事件
    e.target.style.display='none'
})
```

2. pointer-events。让消失元素的底部元素 在 300ms 左右暂时失去click监听功能
```js
.addEventListener('touchstart',(e)=>{
    box.style.pointerEvents='none'     //让元素不监听鼠标事件
    setTimeout(()=>{
      box.style.pointerEvents='auto'
    },300)
    e.target.style.display='none'
})
```

3. 让要消失的元素延迟 300ms 左右消失
```js
.addEventListener('touchstart',(e)=>{
    setTimeout(()=>{
        e.target.style.display='none'
    },300)
})
 ```