// import angular from 'angular'

export default class usersListService {
  constructor($http) {
    this.users = []
    this.getUsers($http)
  }

  getUsers($http) {
    return $http({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users'
    }).then(response => { this.users = [...response.data] })
  }

  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id)
  }
}
