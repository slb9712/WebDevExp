


```js
b();
function b() {
    console.log('1')
}
function b() {
    console.log('2')
}
var b = 1;
console.log(b)
console.log(b())

// 2    1    b not a function 
// 原因：function 关键字声明的函数会被优先执行
```


```js
a();
function a(){
	console.log('a');
}
b();
var b =function b(){
	console.log('b');
}

// 答案：a  b not a function 
```


```js
var a = 14;
fun1();
function fun1(){
	var b = 9;
	console.log(a);
	console.log(b);
	var a = '123';
}

// undefined 9 
// 在函数执行前，内部的用var关键字声明的变量a提前声明了，值为undefined，当遇到重名变量时，会优先使用自身拥有的变量，如果fun1内没有a变量，才会使用外部的变量。
```


```js
	var a = 3;
	function fun1 () {
		var c = b = a = 6;
		console.log(a);
		console.log(b);
		console.log(c);
	}
	fun1();
	console.log(a);
	console.log(b);
	console.log(c);
```

```js
	var y = 1,x = y = typeof x;
	console.log(x);
	//请问代码的执行结果是什么？
// 答案：undefined
// 分析：使用连等赋值时，先看y = typeof x，x此时未赋值，因此是undefined，此时y被赋值为undefined，之后x=y，x被赋值为undefined。
```

```js
var a,b;
	(function(){
		console.log(a);
		console.log(b);
		var a=b=3;
		console.log(a);
		console.log(b);
	})();
	console.log(a);
	console.log(b);
// 	答案：undefined，undefined，3，3，undefined，3
// 分析：即执行函数中var a=b=3可分解为b=3，var a=b，由于b前没有var重新声明，因此是全局变量b被赋值3，之后函数内局部变量a被赋值，第一对console.log输出的a是局部变量a，b是全局变量b，两者都未定义，第三对console.log输出的是全局变量a，b。因此结果为：undefined，undefined，3，
```


```js
	var a = 3;
	function fun1 () {
		var c = b = a = 6;
		console.log(a);
		console.log(b);
		console.log(c);
	}
	fun1();
	console.log(a);
	console.log(b);
	console.log(c);
	//请问，代码执行的结果是什么？
// 答案： 6 6 6 6 6 报错
// 分析：这题考的变量的声明，在函数内用var关键字声明的变量是局部变量，不影响全局变量，没有用var关键字声明的变量是全局变量，因为函数内声明的a变量重名，所以函数内的声明的a变量覆盖了原先的a变量，所以a输出的都是6，因为b也没有用var声明，所以b也是全局变量，在函数外可以访问，而c是用var声明的，局部变量在函数外不能访问，所以报错c未定义
```

