/**
 * 数组扁平化
 * 1、递归
 */
let arr = [1, 2, [3, [4, [5]]]]
function flatten(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = newArr.concat(flatten(arr[i]))
    } else {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log(flatten([1, 2, [3, 4, 5]]))



function flatten(arr) {
  let news = [];
  for(i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      news = news.concat(flatten(arr[i]))
    } else {
      news.push(arr[i])
    }
  }
  return news
}

/**
 * 2、reduce
 */
function flatten(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, []) // [] 防止为空
}


function flattern(arr) {
  arr.reduce((rev, cur) =>{
    return rev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}

/**
 * 3、some + 扩展运算符
 */
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}


/**
 * split + toString
 */
function flatten(arr) {
  return arr.toString().split(',')
}

/**
 * ES6 flat方法
 * flat([depth]) depth是数组展开的深度，默认1，无论多少全展开用Infinity
 */
function flatten(arr) {
  return arr.flat(Infinity)
}