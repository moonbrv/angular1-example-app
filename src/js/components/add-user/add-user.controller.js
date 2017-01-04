/**
 * this class is controller of <add-user> component
 *
 * @export
 * @class addUser
 */

export default class addUser {
  constructor(usersListService) {
    this.srvc = usersListService
    this.errors = {}
    this.warnings = {}
  }

  haveMinimalLength(prop, userObj, minSymbols) {
    this.warnings[prop] = userObj[prop].length < minSymbols ? `You must enter atleast ${minSymbols} symbols` : ''
  }

  uniqueProp(prop, userObj) {
    if (typeof userObj[prop] === 'string') {
      this.errors[prop] = this.srvc.users.filter(x => x[prop].toLowerCase() === userObj[prop].toLowerCase()).length ? ` User with this ${prop} already exist` : ''
    } else {
      this.errors[prop] = this.srvc.users.filter(x => x[prop] === userObj[prop]).length ? ` User with this ${prop} already exist` : ''
    }
  }

  haveNoErrors() {
    // for (let val of this.errors) {
    //   if (val) return false
    // }
    // for (let val of this.warnings) {
    //   if (val) return false
    // }
    return true
  }

  addUser(e, userObj) {
    e.preventDefault()
    if (this.haveNoErrors()) {
      this.srvc.addUser(userObj)
    }
    document.getElementById('user-add').reset()
  }
}
