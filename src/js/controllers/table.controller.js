export default class tableCtrl {
  constructor(usersListService, $timeout) {
    this.users = [...usersListService.users]
    this.sortType = 'name'
    this.sortReverse = false

    // sync data between service and controller every 2 sec
    $timeout(() => { this.users = [...usersListService.users] }, 2000)
  }

  setOrder(type) {
    if (this.sortType === type) {
      this.sortReverse = !this.sortReverse
    } else {
      this.sortReverse = false
      this.sortType = type
    }
  }

  setIcon() {
    return !this.sortReverse ? 'glyphicon glyphicon-triangle-bottom' : 'glyphicon glyphicon-triangle-top'
  }

  setShow(type) {
    return this.sortType === type
  }
}
