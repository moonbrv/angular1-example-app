/**
 * Service class that fetch data(array of users objects) from url and store it
 *
 * @export
 * @class usersListService
 */

export default class usersListService {
  constructor($http) {
    this.users = []
    this.getUsers($http)
  }

  /**
   * get users array in json from url
   * @param  {object} $http
   */
  getUsers($http) {
    return $http({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users'
    }).then(response => { this.users = [...response.data] })
  }

  /**
   * delete user obj from array
   * @param  {string} id
   */
  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id)
  }
}
