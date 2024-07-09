/**手写new */
function myNew(fn, ...args) {
  // 1.在内存中创建一个新对象
  let obj = {}
  // 2.把新对象的原型指针proto指向构造函数的原型对象，连接原型
  obj.__proto__  = fn.prototype
  // 3.改变this指向，this指向新对象，并将构造函数的属性绑定到新对象上；
  let res = fn.apply(obj, args)
  // 4. 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  // 返回值是值类型，则正常返回。如果是引用类型，就返回到引用类型的对象。
  return res instanceof Object ? res : obj
}

/**
 * 解释return
 * 构造函数有返回值的情况下
 * 如果new的构造函数里面return了引用类型，那么新创建的对象就是return出来的对象，不是外部的构造函数
 * 
 */

function news(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let res = fn.apply(obj, args)
  return res instanceof Object? res : obj
}
