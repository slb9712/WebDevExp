
console.log(1)
setTimeout(() => {
    console.log(2)
}, 0)
new Promise((resolve, reject) => {
    console.log(3);
    resolve();
    console.log(4);
}).then(() => console.log(5))
console.log(6)
// 134652



/**
 * Promise.all()会发起并行的Promise异步操作，等所有的异步操作全部结束后
 * 才会执行下一步的.then()操作。
 * 1、按照异步代码调用的顺序得到异步代码执行的结果，
 * 2、所有的成功才成功，有一个失败，就是失败
 */
function PromiseAll(promises) {
  return new Promise(function (resolve, reject) {
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

function promiseall(promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length
    const res = new Array(len)
    let idx = 0
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(value => {
        res[i] = value
        idx++
        if (idx === len) {
          return resolve(res)
        }
      },
      error => {
        return reject(error)
      })
    }
  })
}

function promiseAll(reqs) {
  let res = [];
  let cnt = 0
  return new Promise((resolve, reject) => {
    for (let i =0; i < reqs.length; i++) {
      Promise.resolve(req[i]).then(value => {
        res.push(value);
        cnt += 1;
        if (cnt === req.length) {
          return resolve(res)
        }
      }, error => reject(error))
    }
  })
}

function promiseRace (reqs) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < reqs[i]; i++) {
      Promise.resolve(reqs[i]).then(value => return resolve(value), error => return reject(error))
    }
  })
}

/**
 * Promise.race()会发起并行的Promise异步操作，只要任何一个异步操作完成，
 * 就立即执行下一步的.then()操作
 */
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        value => { // 把Promise对象的resolve方法注入到每一个Promise实例中的回调函数，
          // 只要有一个成功，返回的promise的状态就为resolved
          resolve(value)
        },
        error => { //只要有一个失败，return的promise状态就为reject
          reject(error)
        }
      )
    }
  })
}


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