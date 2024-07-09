/**
 * 节流
 * 高频率触发的事件,在指定的单位时间内，只响应第一次。控制事件发生的频率，如控制为1s发生一次，甚至1分钟发生一次。
 * ------------------------------------
 * 场景
 * 1、鼠标连续不断地触发某事件（如点击），单位时间内只触发一次；
 * 2、计算鼠标移动距离
 * 3、监听scroll滚动事件，比如是否滑到底部自动加载更多
 * 4、浏览器播放事件，每个一秒计算一次进度信息等
 * 快速点击，抢购的时候，
 * -----------------------------------------
 * 方式：
 * 1、时间戳
 * 2、定时器
 * 
 */
function throttle(func, wait) {
  let timer = null;
  return function (){
      if (!timer) {
      timer = setTimeout(() => { timer = null;func();}, wait)
      }
  }
}

function throttles(func, wait) {
  let pre = 0;
  return function() {
    let cur = Date.now();
    let context = this;
    let args = arguments;
    if (cur - pre >= wait) {
      func.apply(context, args);
      pre = cur;
    }
  }
}

function throttle(func, wait) {
  let time = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!time) {
      time = setTimeout(() => {
        func.apply(context, args);
        time = null
      }, wait)
    }
    
  }
}


/**
 * 时间戳方法
 * 第一次会立即执行，停止触发不会再执行
 */
function throttle(func, wait) {
  let oldDate = 0 // 如果想第一次进去就执行，可以改为0，这样第一次差值一定大于wait
  let context, args
  return function() {
    context = this
    args = arguments
    let newDate = Date.now()
    if (newDate - oldDate > wait) {
      func.apply(context, args)
      oldDate = newDate
    }
  }
}


/**
 * 定时器方法
 * 第一次会延迟wait后执行，停止触发后最后一次会执行
 */
function throttle(func, wait) {
  let context, args, timeout
  return function() {
    context = this
    args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait);
    }
  }
}


/**
 * 时间戳+定时器
 * 第一次立即执行，停止触发后最后一次会执行
 */
function throttle(func, wait) {
  let context, args, timeout
  let oldDate = 0
  return function() {
    let newDate = Date.now()
    context = this
    args = arguments
    clearTimeout(timeout)
    if (wait <= newDate - oldDate) {
      func.apply(context, args)
      oldDate = Date.now()
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
        oldDate = Date.now()
      }, wait);
    }
  }
}