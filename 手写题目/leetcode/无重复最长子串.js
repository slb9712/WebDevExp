var lengthOfLongestSubstring = function(s) {
    let charSet = new Set();
    let n = s.length
    let r = -1
    let res = ''
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            charSet.delete(s.charAt(i - 1))

        }
        while(r + 1 < n && !charSet.has(s.charAt(r + 1))) {
            charSet.add(s.charAt(r + 1));
            r += 1
        }
        console.log(r, i)
        if (r - i + 1 > res.length) {
            res = s.substring(i, r +  1)
            console.log(res)
        }
    }
    return res.length
};