## 异步方法有哪些？

1. 回调函数


优点:简单、容易理解和实现

缺点：各个部分之间高度耦合，多个回调函数嵌套不利于代码的阅读和维护，而且每个任务只能指定一个回调函数。此外它不能使用 try catch 捕获错误，不能直接 return

2. Promise

Promise包装了一个异步调用并生成一个Promise实例，当异步调用返回的时候根据调用的结果分别调用实例化时传入的resolve 和 reject方法，then接收到对应的数据，做出相应的处理。

优点：Promise不仅能够捕获错误，而且也很好地解决了回调地狱的问题

缺点：错误需要通过回调函数捕获。

3. Generator

ES6 提供的一种异步编程解决方案，Generator 函数是一个状态机，封装了多个内部状态，可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果。

优点：是异步语义清晰

缺点：手动迭代`Generator` 函数很麻烦，实现逻辑有点绕

4. async/await

基于Promise实现的

优点：使用方法清晰明了

缺点：awt 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 awt 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式

5. setTimeout事件监听




## 补充

callback -> promise -> generator/yield -> async/awt。 async/awt函数对 Generator 函数的改进，体现在以下三点： - 内置执行器。 Generator 函数的执行必须靠执行器，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。 - 更广的适用性。 yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 awt 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。 - 更好的语义。 async 和 awt，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，awt 表示紧跟在后面的表达式需要等待结果



在 ES6 中，Generator 是一种特殊类型的函数，它可以在执行过程中暂停和恢复。Generator 函数的特点是可以返回一个迭代器（Iterator），通过迭代器的 next() 方法可以控制函数的执行流程。Generator 函数使用 function* 关键字定义，并使用 yield 关键字暂停和恢复函数的执行。

以下是一个简单的 Generator 函数示例：
```js
javascript
复制代码

function* myGenerator() {
  console.log('开始执行');
  yield 1;
  console.log('从第一个暂停恢复');
  yield 2;
  console.log('从第二个暂停恢复');
  yield 3;
  console.log('执行完毕');
}

const iterator = myGenerator();

console.log(iterator.next()); // 输出：开始执行 {value: 1, done: false}
console.log(iterator.next()); // 输出：从第一个暂停恢复 {value: 2, done: false}
console.log(iterator.next()); // 输出：从第二个暂停恢复 {value: 3, done: false}
console.log(iterator.next()); // 输出：执行完毕 {value: undefined, done: true}

```
在这个示例中，我们定义了一个名为 myGenerator 的 Generator 函数。当我们调用这个函数时，它会返回一个迭代器。我们可以通过调用迭代器的 next() 方法来控制 Generator 函数的执行。

每当我们调用 next() 方法时，Generator 函数会从上一个 yield 语句处开始执行，直到遇到下一个 yield 语句。每次调用 next() 方法都会返回一个对象，该对象包含两个属性：value（yield 语句返回的值）和 done（表示 Generator 函数是否已经执行完毕）。

Generator 函数在实际应用中可以用于解决许多问题，如异步编程、处理流式数据等。