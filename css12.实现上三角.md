三角形往哪个方向，哪个方向就无需设置border，而相反方向设置border颜色，相邻两边的border设为透明。
```js
// 上三角
.triangle_border_up {
  border: 20px solid red;
  border-top: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  width: 0px;
}
```

.class {
  border: 2px solid color;
  border-top: 0;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  width: 0
}