## Promise
 ## 解释
 Promise是异步微任务，解决了异步多层嵌套回调的回调地狱问题，让代码的可读性更高，更容易维护 
 ## 特点
1. 对象的状态不受外界影响（Promise对象代表一个异步操作，有三种状态）。 - pending（执行中） - Resolved（成功，又称Fulfilled） - rejected（拒绝） 其中pending为初始状态，fulfilled和rejected为结束状态（结束状态表示promise的生命周期已结束）。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
3. 一旦成功或失败都会触发then，默认两个回调，如果没有reject回调，会在catch中进行捕获，catch也会捕获在then中的方法。
4. then 方法和 catch方法只要不报错，返回的都是一个fullfilled状态的promise 

## 补充
1. Promise.resolve(): 返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。 
2. Promise.reject()：返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法。 
3. Promise.all()：返回一个新的promise对象，该promise对象在参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。 
4. Promise.any()：接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。 
5. Promise.race()：当参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。


## ES6 实现的 Promise 和 Promise 规范有啥区别，是否兼容？怎么查看网站是否兼容？
ES6在规范实现基础上额外增加了一些Promise.all和Promise.race之类的简便方法
caniuse.com 查看兼容情况

## Promise 的各种规范
promiseA+规范
promise应该有三种状态
then
promise应该提供一个then方法，用来访问最终的结果，无论是value还是reason
## 手写
```javascript
/**
 * Promise.all()会发起并行的Promise异步操作，等所有的异步操作全部结束后
 * 才会执行下一步的.then()操作。
 * 1、按照异步代码调用的顺序得到异步代码执行的结果，
 * 2、所有的成功才成功，有一个失败，就是失败
 */
function PromiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (Array.isArray(promises)) {
      const len = promises.length
      let idx = 0
      let result = []
      for (let i = 0; i < len; i++) {
        Promise.resolve(promises[i]).then(
          value => {
            idx++
            result[i] = value
            if (idx === len) { // / 如果全部p都为resolved状态，return的promise状态为resolved
              return resolve(result)
            }
          },
          error => { //只要有一个失败 return的promise状态reject
          return reject(error)
        })
      }
    }
  })
}



```
```javascript
/**
 * Promise.race()会发起并行的Promise异步操作，只要任何一个异步操作完成，
 * 就立即执行下一步的.then()操作
 */
function myRace(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        value => { // 把Promise对象的resolve方法注入到每一个Promise实例中的回调函数，
          // 只要有一个成功，返回的promise的状态就为resolved
          return resolve(value)
        },
        error => { //只要有一个失败，return的promise状态就为reject
          return reject(error)
        }
      )
    }
  })
}
```
### 测试
```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p3 = new Promise((resolve, reject) => {
  resolve('0000o');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  reject('报错了');
})
.then(result => result)
.catch(e => e); // p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数
```
## 问题
1. Promise之前还有什么方法解决异步回调问题

答：callback(回调函数) -> promise -> generator/yield -> async/awt

2. 怎么终止Promise链？

答：在需要终止的地方，返回一个pending状态或者reject状态的Promise对象即可，后面then 所有resolve（onFulfilled）的处理函数就都不会跑到了。

