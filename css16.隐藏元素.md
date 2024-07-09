## display：none
```css
.conceal {
   display：none
}
/* 特点：元素不可见，不占据空间，无法响应点击事件  */
/* 会导致浏览器的重排的重绘 */
```

## visibility：hidden
```css
.conceal {
   visibility：hidden
 }
 /* 元素不可见，占据空间，无法响应点击事件 */
/* 不会发生重排，但是会发生重绘 */
```

## opacity：0

```css
.conceal {
   opacity：0
}
/* 改变元素透明度，元素不可见，占据页面空间，可以响应点点击事件。 */
/* 不会引发重排，可能会引发重绘 */
```

## 设置height、width模型属性为0
```css
/* 元素的margin、border、padding、height和width等影响元素盒模型的属性设置成0 */
.conceal {
    margin:0;     
    border:0;
    padding:0;
    height:0;
    width:0;
    overflow:hidden;
}
/* 如果元素内有子元素的内容，还要设置其overflow：hidden 来隐藏子元素 */
/* 元素不可见，不占据空间，无法响应点击事件 */
```

## position：absolute
```css
.conceal {
   position: absolute;
   top: -9999px;
   left: -9999px;
}
```
## clip-path
```css
.conceal {
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
}
/* 元素不可见，占据空间，无法响应点击事件 */
```