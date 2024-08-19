
/**
 * 思路
 * 1. 先转字符串按最长补0，
 * 2. 从末尾向前依次相加，并记录进位
 * 3. 返回输出的时候判断下进位
 * @param {*} num1 
 * @param {*} num2 
 * @returns 
 */
function bigNumAdd(num1, num2) {
    let s1 = string(num1), s2 = string(num2)
    const len = Math.max(s1.length, s2.length);
    s1 = s1.padStart(len, '0')
    s2 = s2.padStart(len, '0')
    let res = '', carry = 0
    for (let i = len - 1; i >= 0; i--) {
        const sum = +s1[i] + +s2[i] + carry
        res = sum % 10 + res
        carry = Math.floor(sum / 10)
    }
    return carry ? carry + res: res
}