/**
 * this class is controller of <edit-user> component
 *
 * @export
 * @class editUser
 */

export default class editUser {
  constructor(usersListService, $element, $scope, $location) {
    'ngInject'
    this.scope = $scope
    this.elem = $element
    this.usersListService = usersListService
    this.scope.user = Object.assign({}, this.editedUser)
    this.location = $location
    this.url = this.location.url()
  }

  /**
   * function add new user to users array using service method
   *
   * @param  {object} e (event)
   * @param  {object} userObj
   */
  addUser(e, userObj) {
    e.preventDefault()
      this.usersListService.addUser(userObj)
      this.elem.find('form')[0].reset()
      this.location.path('/')
  }

  /**
   * function add new user to users array using service method
   *
   * @param  {object} userObj
   */
  changeUser(userObj) {
      this.usersListService.users = [
        ...this.usersListService.users.filter(x => x.id !== userObj.id),
        userObj
      ]
  }
}
