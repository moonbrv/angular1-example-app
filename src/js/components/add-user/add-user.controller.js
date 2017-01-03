/**
 * this class is controller of <add-user> component
 *
 * @export
 * @class addUser
 */

export default class addUser {
  constructor(usersListService) {
    this.srvc = usersListService
  }

  addUser(e, userObj) {
    e.preventDefault()
    this.srvc.addUser(userObj)
    document.getElementById('user-add').reset()
  }
}
