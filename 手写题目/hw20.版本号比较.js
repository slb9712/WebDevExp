console.log(Date())
const d = new Date()
console.log(d)

console.log(Date.parse(d))
console.log(d.getTime())
console.log(Date.now())

/**
 * 
 * 
 */

const s1 = ''
function compareVersion(s1, s2) {
    const arr1 = s1.split('.')
    const arr2 = s2.split('.')
    const len = Math.max(arr1.length, arr2.length)
    for (let i =0; i < len; i++) {
        const n1 = Number(s1[i] || 0);
        const n2 = Number(s2[i] || 0);
        if  (n1 < n2) return -1
        if (n1 > n2) return 1

    }
    return 0

}