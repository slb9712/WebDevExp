// 作用是改变函数执行时的上下文

//  三者都可以改变函数的this对象指向
// 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window
// 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
// bind是返回绑定this之后的函数，apply、call 则是立即执行
/**
 * call()
 */
Function.prototype.myCall = function(context) {
  // arguments = [this, arg1, arg2, arg3]
  if (typeof this === "function") { // 因为都是function原型上的方法
    let args = [...arguments].slice(1), result = null
    context = context || window // 判断上下文对象，没有传入的话则为window
    context.fn = this // 把函数设为对象的方法
    result = context.fn(...args) // 调用函数
    delete context.fn // 把 context 里面原本没有的属性删除
    return result
  }
}

if (typeof this == 'function') {
  let args = [...arguments].slice(1), res = null
  context = context || window
  context.fn = this
  res = context.fn(...args)
  delete context.fn
  return res
}
// call 和apply只有在处理参数的时候的差别
function call(context) {
  if (typeof context  === 'function') {
    let args = [...arguments].slice(1), res = null
    context = context ? context || window
    context.fn =this
    res = context.fn(...args)
    delete context.fn
    return res
    if (args) {
      res = context.fn(...args[0])
    } else {
      res = context.fn()
    }
  }
}

/***
 * apply(fn, [arg1, arg2,...])
 * 如果返回的是一个对象的话，要有返回值
 * */
Function.prototype.myApply = function(context) {
  // arguments = [this, [arg1, arg2, arg3]]
  if (typeof this == "function") { // 调用对象是函数
    let args = 
    let result = null
    context = context || window // context 不存在的话则为window
    context.fn = this // 把函数设为对象的方法
    if (arguments[1]) {
      result = context.fn(...arguments[1])
    } else {
      result = context.fn()
    }
    delete context.fn // 把 context 里面原本没有的属性删除
    return result
  }
}

/**
 * bind(fn, arg1, arg2,...)
 */
Function.prototype.myBind = function(context) {
  if (typeof this === "function") {
    let args = [...arguments].slice(1), fn = this
    return function Fn() {
      return fn.apply(
        this instanceof Fn ? this : context,  //如果 bind 得到的函数用作构造函数（带 new 关键字使用），则 bind 不生效,this 该是什么还是什么,
        //  如果当前this是Fn的实例，那么就指向这个实例，否则指向context
        // 不能一直绑定context这个目标对象，这个目标对象是我们传递的对象，在new bind时我们需要的是一个实例作为传递对象才可以
        //使用 instanceof 判断 this 是否为当前函数的实例，即可判断一个函数被 new 操作符调用
        args.concat(...arguments) // 是将bind时绑定的参数与调用时传的参数合并在一起。 ...arguments 调用bind时传的参数
      )
    }
  }
}