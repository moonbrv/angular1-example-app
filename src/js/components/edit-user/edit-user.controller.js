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
    this.errors = {}
    this.warnings = {}
    this.scope.user = Object.assign({}, this.editedUser)
    this.location = $location
    this.url = this.location.url()
  }

  /**
   * function check if a string value have minimal length
   * if @param important is false warning will display only if user input atleast one character
   *
   * @param  {string} prop
   * @param  {object} userObj
   * @param  {number} minSymbols
   * @param  {boolean} important
   */
  haveMinimalLength(prop, userObj = {}, minSymbols = 3, important = false) {
    if (!userObj[prop]) {
      userObj[prop] = ''
    }
    const length = userObj[prop].trim() ? userObj[prop].trim().length : 0
    if (important) {
      this.warnings[prop] = length < minSymbols ? `You must enter atleast ${minSymbols} symbols` : ''
    } else {
      this.warnings[prop] = length < minSymbols && length > 0 ? `Minimal length ${minSymbols} symbols` : ''
    }
  }

  /**
   * function check if a value of chosen propherty of object is unique in users array
   * notice that error messages have space as first character
   *
   * @param  {string} prop
   * @param  {object} userObj
   */
  uniqueProp(prop, userObj) {
    if (angular.isString(userObj[prop])) {
      const filtered = this.usersListService.users
      .filter(x => x[prop].trim().toLowerCase() === userObj[prop].trim().toLowerCase())
      .filter(x => x.id !== userObj.id)
      this.errors[prop] = filtered.length ? ` User with this ${prop} already exist` : ''
    } else {
      this.errors[prop] = this.usersListService.users.filter(x => x[prop] === userObj[prop]).length ? ` User with this ${prop} already exist` : ''
    }
  }

  /**
   * function check if any warnings or errors curently exist
   */
  haveNoErrors() {
    for (let val in this.errors) {
      if (this.errors[val]) return false
    }
    for (let val in this.warnings) {
      if (this.warnings[val]) return false
    }
    return true
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

  changeUser(userObj) {
      this.usersListService.users = [
        ...this.usersListService.users.filter(x => x.id !== userObj.id),
        userObj
      ]
  }
}
