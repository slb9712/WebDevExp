// let res = [1, 2, 3, 4, 4, 4, 7, 8, 9]
// // let res = [1, 1, 1, 1]
// // let res = [1]
// // let res = []
// let out = []
// let pre = res[0], start = 1
// for (let i = 1; i < res.length; i++) {
//   if (res[i] - res[i - 1] <= 1) {
//     continue
//   } else {
//     if (pre === res[i - 1]) {
//       out.push(String(pre))
//     } else {
//       out.push(String(pre) + '-' + String(res[i - 1]))
//     }
//     pre = res[i]
//   }
// }
// if (pre === res[res.length - 1]) {
//   out.push(String(pre))
// } else {
//   out.push(String(pre) + '-' + String(res[res.length - 1]))
// }

// console.log(res.length === 0 ? [] : out)




// let s = 'bacbab'
// let m = s.length, maxlen = 0, begin = 0
// const dp = new Array(m).fill(false).map(()=> new Array(m).fill(false))
// for (let i = m - 1; i >= 0; i--) {
//     for (let j = i; j < m; j++) {
//         if (s[i] === s[j]) {
//             if (j - i < 3) {
//                 dp[i][j] = true 
//             }
//             else {
//                 dp[i][j] = dp[i + 1][j - 1]
//             }
//         }
//         if (dp[i][j]) {
//             if ((j - i) > maxlen) {
//                 maxlen = j - i
//                 begin = i
//             }
//         }
//     }
// }


// function reverseString(str) {
// 	if (str === "")
// 		return "";
// 	else
// 		return reverseString(str.substring(1)) + str.charAt(0);
// }
 
// console.log(reverseString('hello, World'))


// function aa (m, n) {
// 	let val = 0
// 	for (let i = 1; i <= m; i++) {
// 		val = (val + n) % i
// 	}
// 	return val + 1
// }
// console.log(aa(5, 3))


// function getNum(params) {
// 		this.params = params
// 		this.fn = function (params) {
// 			console.log(this.params)
// 			this.params = params
// 			return fn
// 		}
// 		return this.fn
		
// }

// getNum('jack')('lili')('mark')()

// str = '213123424.12121121'
// res = Number(str).toLocaleString()
// console.log(res)

num = '121212121.43534534'
// let arr = num + ""
// arr = arr.split(".")
// let int = arr[0].split("")
// let lit = arr[1] || ""
// let res = ""

// int.reverse().forEach(function(item, idx){
// 	if (idx !== 0 && idx % 3 === 0) {
// 		res = item + ',' + res
// 	} else {
// 		res = item + res
// 	}
// })
// console.log(res + (!!lit? "." + lit : ""))
// function thousand(num) {
// 	return (num + "").replace(/\d(?=(\d{3})+$)/g, "$&,")
// }
// // console.log(thousand(num))


// const arr =[{ value: '1'},{ value: 'html' },{ value: 'css' },{ value: '2'},{ value: 3 },{ value: '中文'}]

// function getVal(arr) {
// 	let a = [], b = []
// 	let reg = /[^0-9]/;
// 	for (let i= 0; i < arr.length; i++) {
// 		let tmp = typeof arr[i].value
// 		if (tmp === 'number') { 
// 			a.push(arr[i].value)
// 		} else {
// 			if (reg.test(arr[i].value)) {
// 				b.push(arr[i].value)
// 			} else {
// 				a.push(arr[i].value)
// 			}
// 		}
// 	}
// 	console.log(a)
// 	console.log(b)
// }
// getVal(arr)



// arr = [2, 2, 1, 1, 1, 2, 2]

// function getCount(arr) {
// 	let max = 0
// 	let res
// 	let map = new Map()
// 	for (let i = 0; i < arr.length; i++) {
// 		if (map.has(arr[i])) {
// 			let cnt = map.get(arr[i]) + 1
// 			if (cnt > max) {
// 				max = cnt
// 				res = arr[i]
// 			} 
// 			map.set(arr[i], cnt)
// 		} else {
// 			map.set(arr[i], 1)
// 		}
// 	}
// 	console.log(res)
// }

// getCount(arr)


// arr = [2, '1', 'abd', [1, 8], 2]

// function deepCopy(obj) {
//   if (!obj || typeof obj !== 'object') return 
//   let newObj = Array.isArray(obj) ? [] : {} 
//   for (let key in obj) { 
//     if (obj.hasOwnProperty(key)) { 
//       newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
//     }
//   }
//   return newObj
// }

// console.log(deepCopy(arr))

console.log('123')
async function async1() {
  console.log("async1 start")
  await async2()
  console.log("async1 end")
  setTimeout(()=> {console.log("timer1")},0)
}
async function async2(){
  setTimeout(()=>{
      console.log("timer2")
  },0)
}