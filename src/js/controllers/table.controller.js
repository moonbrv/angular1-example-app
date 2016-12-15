export default class tableCtrl {
  constructor(usersListService, $http) {
    usersListService.getUsers($http).then(response => { this.users = response.data })
  }
}
