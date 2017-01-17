/**
 * Service class that fetch data(array of users objects) from url and store it
 *
 * @export
 * @class usersListService
 */

export default class usersListService {
  constructor($http) {
    'ngInject'
    this.users = []
    this.getUsers($http)
  }

  /**
   * get users array in json from url
   *
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
   *
   * @param  {Number} id
   */
  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id)
  }

  /**
   * function create Id to new User
   *
   * @returns  {string}
   */
  getId() {
    return Math.max.apply(Math, this.users.map(x => x.id)) + 1
  }

  /**
   * addUser - function to add new user to array, immutable way with spread operator
   *
   * @param  {object} obj New user obect
   */
  addUser(obj) {
    this.users = [...this.users, Object.assign({}, {id: this.getId()}, obj)]
  }

  /**
   * @param  {string} prop
   * @param  {any} val
   * @returns  {boolean}
   */
  uniqueValue(prop, val) {
    let filtered
    if (angular.isString(val)) {
      filtered = this.users
      .filter(x => x[prop].trim().toLowerCase() === val.trim().toLowerCase())
    } else {
      filtered = this.users.filter(x => x[prop] === val)
    }
    return !filtered.length
  }
}
