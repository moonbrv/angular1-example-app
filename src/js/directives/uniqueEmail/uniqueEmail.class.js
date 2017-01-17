export default class editUsersValidation {
  constructor(usersListService) {
    this.restrict = 'A'
    this.require = 'ngModel'
    this.usersListService = usersListService
  }
  link(scope, elemnt, attr, ctrl) {
    function custromValidator(ngModelValue) {
      if (this.usersListService.uniqueValue('email', ngModelValue)) {
        ctrl.$setValidity('uniqueEmail', true)
      } else {
        ctrl.$setValidity('uniqueEmail', false)
      }
      return ngModelValue
    }
    ctrl.$parsers = [...ctrl.$parsers, custromValidator]
  }
}
