// import angular from 'angular'

export default class usersListService {
  getUsers($http) {
    return $http({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users'
    })
  }
}
