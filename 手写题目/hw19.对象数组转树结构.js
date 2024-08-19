function arrToTree(arr, parentId) {
    let newArr = []
    arr.forEach(item => {
      if (item.pid ===  parentId) {
        newArr.push({
          ...item,
          children: arrToTree(arr, item.id)
        })
      }
    })
    return newArr
  }
const arr = [
{ id: 1, pid: null, name: "1" },
{ id: 2, pid: null, name: "2" },
{ id: 3, pid: 2, name: "3" },
{ id: 4, pid: 2, name: "4" },
{ id: 5, pid: 2, name: "5" },
{ id: 6, pid: 3, name: "6" },
{ id: 7, pid: 6, name: "7" },
];
console.log(arrToTree(arr, null))