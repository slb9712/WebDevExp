/**
 * 函数柯里化
 * 把接受多个参数的函数转换成接受一个单一参数的函数，并且返回接受余下的参数的新函数的技术
 * 
 * 优点：
 * 1、参数复用（利用了闭包和高阶函数的特性）
 * 2、延迟运行（js bind方法，实现机制就是柯里化
 */

function curryed(a) {
  let sum;
  function curryeds(b) {
    if (b) {
      sum += b
      return curryeds
    } else {
      return sum
    }
  }
  return curryeds
}



function curry(fn, ...args) {
  // fn需要的参数是否够了
  if (args.length >= fn.length) {
    // 够了直接执行fn并返回结果
    return fn(...args)
  }
  return (...rest) => {
    return curry(fn, ...args, ...rest)
  }
  // 否则拼接，直到fn参数够了，直接执行fn并返回结果
}

const add = (x, y, z) => x + y + z
const curryAdd = curry(add, 1, 2)(3)
console.log(curryAdd)


function curry (fn, ...args) {
  if (fn.length <= args.length) {
    return fn(...args)
  }
  return (...rest) => curry(fn, ...args, ...rest)
  
}
