const item_list = document.querySelectorAll('.panel')

item_list.forEach(item => {
  item.addEventListener('click', () => {
    // console.log(item)
    removeActiveClasses()
    item.classList.add('active')
  })
})

removeActiveClasses = function() {
  item_list.forEach(panel => {
    // console.log(panel)
    panel.classList.remove('active')
  })
}