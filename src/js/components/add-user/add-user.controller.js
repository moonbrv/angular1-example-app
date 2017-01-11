/**
 * this class is controller of <add-user> component
 *
 * @export
 * @class addUser
 */

export default class addUser {
  constructor(usersListService, $element) {
    'ngInject'
    this.elem = $element
    this.srvc = usersListService
    this.errors = {}
    this.warnings = {}
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
      this.errors[prop] = this.srvc.users.filter(x => x[prop].trim().toLowerCase() === userObj[prop].trim().toLowerCase()).length ? ` User with this ${prop} already exist` : ''
    } else {
      this.errors[prop] = this.srvc.users.filter(x => x[prop] === userObj[prop]).length ? ` User with this ${prop} already exist` : ''
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
    if (this.haveNoErrors()) {
      this.srvc.addUser(userObj)
    }
    this.elem.find('form')[0].reset()
  }
}
