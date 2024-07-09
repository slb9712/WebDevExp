## 实现思路
### 同步执行的情况
1. 首先用class来定义一个类；其中constructor来接收执行器；执行器是立即执行的，并且有两个参数，resolve和reject，定义resolve、reject属性用箭头函数定义（因为我们在promise中调用的时候是直接调用的，那么在普通函数中this的指向是window或者undefined，定义成箭头函数目的就是为了这个函数内部的this指向这个实例对象也就是promise对象）

2. resolve和reject是用来更改状态的，所以要有状态这个属性，状态属性是promise独有的所以定义成实例属性，如： status = PENDING

3. 调用resolve函数的时候是改变状态的值为成功 this.status = FULFILLED; reject函数则将状态更改为失败this.status = REJECTED; 并且在内部保留成功的值或者失败的原因。

又因为状态一旦更改不可改变，所以在函数内部开头的时候判断，如果状态不是等待 返回return 阻止程序向下执行 if (this.status !== PENDING) return

4. 最后，每个promise对象都有个then方法，定义在原型对象中，有两个参数，一个成功回调一个失败回调，来是判断promise状态，如果this.status === FULFILLED，调用成功的回调，反之失败的回调；成功和失败回调都要一个参数，分别表示成功之后的值和失败的原因（默认值是undefined），这两个值我们会在resolve和reject中拿到，将他们保存下来，在then的两个参数中会用到

```js
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise{
    constructor (executor) {
        executor(this.resolve, this.reject)
    }
    status = PENDING;
      // 成功之后的值（默认值是undefined）
    value = undefined;
    // 失败后的原因
    reason = undefined;
    resolve = value => {
        // 如果状态不是等待 阻止程序向下执行（因为一旦状态确定就不可更改）
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 保存成功之后的值 为什么要保存？因为要在then中拿到
        this.value = value;
      }
    reject = reason => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 保存失败后的原因
         this.reason = reason;
         }
    then (successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value);
        }else if (this.status === REJECTED) {
            failCallback(this.reason);
        }
    }
}

```


### 异步执行的情况
异步执行的时候会出现一个情况，
执行顺序：执行器立即执行，里面有个定时器异步代码，主线程是不会等待异步代码执行的，所以将它们放在等待队列里，接着执行then方法，因为没有调用resolve或者reject所以状态肯定是等待的，我们封装的then方法中没有考虑状态是等待的情况

解决办法就是要判断一下状态，什么时候调它，当状态变为成功或失败的时候调相应的回调，
所以在then里面先将成功和失败回调存储起来，等调用resolve或者reject时，先判断一下是否有成功或者失败回调，有就执行。

```js
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise{
    constructor (executor) {
        executor(this.resolve, this.reject)
    }
    status = PENDING;
      // 成功之后的值（默认值是undefined）
    value = undefined;
    // 失败后的原因
    reason = undefined;
      // 成功回调
    successCallback =undefined;
    // 失败回调
    failCallback = undefined;
    resolve = value => {
        // 如果状态不是等待 阻止程序向下执行（因为一旦状态确定就不可更改）
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 保存成功之后的值 为什么要保存？因为要在then中拿到
        this.value = value;
         // 判断成功回调是否存在 如果存在 调用
         this.successCallback && this.successCallback(this.value);
      }
    reject = reason => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 保存失败后的原因
         this.reason = reason;
         // 判断失败回调是否存在 如果存在 调用
         this.failCallback && this.failCallback(this.reason);
        }
    then (successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value);
        }else if (this.status === REJECTED) {
            failCallback(this.reason);
        }else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallback = successCallback;
            this.failCallback = failCallback;
    }
}

```


### then方法多次调用问题
then方法可以被多次调用。
多次调用then的时候,也分为同步和异步的情况，同步的情况是依次执行的（已经知道其状态了），不需要更改，异步情况时我们的then是要将所有传递函数都要执行，所以我们先要将其在then中都存储起来，存放函数的变量就要变成数组，在resolve和reject中一次这个参数

```js
class MyPromise{
    constructor (executor) {
        executor(this.resolve, this.reject)
    }
    status = PENDING;
      // 成功之后的值（默认值是undefined）
    value = undefined;
    // 失败后的原因
    reason = undefined;
      // 成功回调
    successCallback =[];
    // 失败回调
    failCallback = [];
    resolve = value => {
        // 如果状态不是等待 阻止程序向下执行（因为一旦状态确定就不可更改）
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 保存成功之后的值 为什么要保存？因为要在then中拿到
        this.value = value;
         // 判断成功回调是否存在 如果存在 调用
       while(this.successCallback.length) this.successCallback.shift()(this.value);
      }
    reject = reason => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 保存失败后的原因
         this.reason = reason;
         // 判断失败回调是否存在 如果存在 调用
         while(this.failCallback.length) this.failCallback.shift()(this.reason);
        }
    then (successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value);
        }else if (this.status === REJECTED) {
            failCallback(this.reason);
        }else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallback.push(successCallback);
            this.failCallback.push(failCallback);
    }
}
}

```

### then方法链式调用
promise的then方法是可以被链式调用的
实现思路：then方法都应该返回一个promise对象。将上一个then方法的返回值传递给下一个回调函数（首先找到下个then所对应的那个promise对象即promise2，在调用promise2中的resolve方法的时候将上一个返回值传递个它）。
```js
then (successCallback, failCallback) {
    //既然要返回一个promise对象，那么我们先创建一个promise对象;原先代码去到执行器里面，都是立即执行的
    	let promise2 = new MyPromise((resolve,reject)=>{
	    	 if (this.status === FULFILLED) {
	          let x =  successCallback(this.value);
	          resolve(x);
	        }else if (this.status === REJECTED) {
	            failCallback(this.reason);
	        }else {
	            // 等待
	            // 将成功回调和失败回调存储起来
	            this.successCallback.push(successCallback);
	            this.failCallback.push(failCallback);
	    	}
    	}); 
    	return promise2;
	}
```

### Promise错误捕获
思路：处理错误：第一：处理的错误是执行器，当执行器执行过程中发生错误的时候，我们让promise的状态变成失败的状态并将错误原因传递下去，我们要在then第二个参数的地方捕获这个错误；第二：我们要处理then方法中的回调函数，如果这个函数执行过程中报错了，我们也要捕获到这个错误，这个错误要在下一个then方法的错误回调中捕获到，如果在执行回调时发生错误，我们要将这个错误通过reject传递给下个去;第三：在异步的执行中也要加上捕获错误
注：如果我们的then方法的失败回调函数中是没有错误的，执行成功的，那么它的返回值会在下个then方法的成功回调中接收


**then**看then方法的内部有没有参数，如果没有参数就给他补一个参数

**resolve**：判断一下这个参数是否是个promise对象，如果是原封不动的返回，如果不是就创建一个promise对象，将给定的值包裹在promise中，再将这个值返回就可以了
**finally**：调用then方法；系统提供的promise中是等待finally中return的promise执行完之后在执行后面的then方法，这时候需要借助resolve这个方法，看finally的参数执行完之后返回的是什么，如果是普通值，转换成promise对象，等待执行完毕，如果是promise对象，还是等待完成，返回这个value
**catch**:只需在catch方法内部调用then方法就可以了，在调用then方法的时候在成功的那个地方传入undefined,在失败的那个地方传递回调函数。