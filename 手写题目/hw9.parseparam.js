/**
 * 解析url
 */
function parseParam(url) {
  const [, search] = url.split('?') // ?后面的查询参数
  const array = search.split('&')
  return array.reduce((accu, str) => {
    if (str.includes('=')) {
      let [key, value] = str.split('=')
      // 中文解码
      value = decodeURIComponent(value)
      // 转为数字
      value = /^\d+$/.test(value)? +value : value
      if (accu.hasOwnProperty(key)) {
        // 出现过key
        accu[key] = [].concat(accu[key], value)
      } else {
        accu[key] = value
      }
    } else {
      // 没有等号就是enabled参数
      accu[str] = true
    }
    return accu
  }, {})
}
console.log(parseParam('https://www.baidu.com/s?ie=UTF-8&wd=js%E5%A4%9A%E8%A1%8C%E6%B3%A8%E9%87%8A'))


function decodeUrl(url) {
  const [, search] = url.split('?')
  const urls = search.split('&')
  return urls.reduce((prev, val) =>{
    if (val.includes('=')) {
      const [key, value] = val.split('=')
      let targetVal = decodeURIComponent(value)
      targetVal = /^\d+$/.test(value) ? +value: value
      if (prev.hasOwnProperty(key)) {
        prev[key] = [].concat(prev[key], value)
      } else {
        prev[key] = value
      }
    } else {
      prev[val] = true
    }
    return prev
  }, {})
}