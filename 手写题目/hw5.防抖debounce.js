
/**防抖策略（debounce）是当事件被触发后，延迟n秒后再执行回调，如果在这n秒内事件又被触发，则重新计时。
 * 应用场景（懒加载）
 * 1、
 * 2、搜索框输入自动查询
 * 3、文本编辑器实时保存，当无任何更改操作一秒后进行保存
 * 4、表单等信息验证，避免多次请验证求
 * 5、窗口缩放，监听resize事件，避免频繁触发
 */


/***
 * 简单版本
 * 
 * ***/
function debounce(func, wait) {
  let timeout

  return function () {
    let context = this // 保存this指向
    let args = arguments // 拿到event对象

    clearTimeout(timeout) // 每次触发都会重新计时器
    timeout = setTimeout(function(){
      func.apply(context, args)
    }, wait)
  }
}
function debounce(func, wait) {
  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
    }, delay)
    }
  }
}


function debounce(func, wait) {
  let timer = null
  return function () {
    let context = this;
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    } else {
      setTimeout(() => {
        func.apply(context, args)
        timer = null
      }, wait)
    }
  }
}
// 使用方式
const printSth = (msg) {
  console.log(this.name, msg)
}
let f = debounce(printSth(), 5000)
let obj = {name: 'xiaoming'}
f.call(obj, 'nihao')

function debounce(func, wait) {
  let time = null;
  return function() {
    let context = this;
    let args = arguments;
    if(time) {
      clearTimeout(time);
    }else {
      time = setTimeout(() => {
        func.apply(context, this);
      }, wait)
    }
  }
}

/**
 * 
 * 立即执行版本
 * 
 * fun中的this指向debounce中return的这个函数中的this，return回来的这个函数中的this也就是
 * 指向直接调用return 函数那个对象这里都是window来直接调用return回来的那个函数。所以这里的this其实没啥用，
 * 之所以这么写是因为arguments就是传入的参数数组,而且个数可以不确定的传回给fn
 * 如何将arguments传回给需要防抖的函数。apply是一个恰到好处的应用
 * 不用apply也行，在防抖函数外面需要先绑定this即可
 * 
 * 解释：
 * https://blog.csdn.net/weixin_44494811/article/details/103486637?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-103486637-blog-123735590.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-103486637-blog-123735590.pc_relevant_aa&utm_relevant_index=1
 */

 function debounce(func, wait, immediate) {
  let timeout

  return function() {
    let context = this
    let args = arguments

    clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout // 第一次触发timeout不存在，为undefind，立即执行，第二次即使clearTimeout，timeout不等于null。
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) {
        // 关于
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout
  return function() {
    let context = this
    args = arguments
    clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function() {
        func.call(context, args)
      }, wait)
    }
  }
}

window.addEventListener('mousemove', debounce(()=>{console.log('ha')}, 5000, true))
