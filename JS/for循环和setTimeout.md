```js
for(var i=0;i<10;i++){
    setTimeout(function(){
      console.log(i);  
    },i*1000);
    }
// 答案：10、10、10、10、10、10、10、10、10、10
// 代码中的for循环是个同步任务，setTimeout是个异步任务，所以把for循环执行完毕后（i=10）才会执行setTimeout（）函数，所以导致输出了10个10的结果


for(var i = 0; i < 5; i++) {
	setTimeout(
		function() {
			console.log(i)	// 5 5 5 5 5 
		}, 0)
}


for (var i=0; i<10; i++) { 
    setTimeout(console.log(i), i*1000 );
    }
 
// 答案：0、1、2、3、4、5、6、7、8、9

```

setTimeout() 会判断第一个参数是否是[function]，如果是，则执行异步任务。如果不是，则会尝试将它当做字符串处理。所以第二段代码setTimeout里面的function被当成异步任务不会立刻执行，而是被放入任务队列。