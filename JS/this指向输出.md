```js

var name = 'the window';
var obj = {
  name:'My Object',
  fun1:function  () {
    return function () {
      return this.name;
    }
  }
}
alert(obj.fun1()());
//请问代码的执行结果是什么？
// 答案：the window
// 分析：这题也是考this指向，obj.fun1()返回的是一个函数体，这个函数体在对象外被调用，this指向的是window，而window里有name这个属性，所以输出the window。
```


```js
var user = {
  count:1,
  getCount:function () {
    return this.count;
  }

}
console.log(user.getCount());
var func = user.getCount;
console.log(func());
//请问代码的执行结果是什么？
// 答案： 1 undefined
// 分析：本题考点this指向，getCount被user调用，所以this指向的是user，返回1， 变量func接收的是一个函数体，所以当func执行的时候，this指向的是window，而window里没有count这个属性，所以返回的是undefined。
```