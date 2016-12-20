export default class tableCtrl {
  constructor(usersListService) {
    this.users = usersListService.users
    this.sortType = 'name'
    this.sortReverse = false
  }

  setOrder(type) {
    if (this.sortType === type) {
      this.sortReverse = !this.sortReverse
    } else {
      this.sortReverse = false
      this.sortType = type
    }
    // console.log(`order by ${this.sortType} reverse is ${this.sortReverse}`)
  }

  setIcon() {
    return !this.sortReverse ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-top'
  }

  setShow(type) {
    return this.sortType === type
  }
}
