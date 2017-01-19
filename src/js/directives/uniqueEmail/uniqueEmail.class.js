/**
 * Class to create directive which add unique email validation to form
 *
 * @export
 * @class uniqueEmail
 */
export default class uniqueEmail {
  constructor(usersListService) {
    'ngInject'
    this.require = 'ngModel'
    this.restrict = 'A'
    this.usersListService = usersListService
  }

  link(scope, elemnt, attr, ctrl) {
    const usersListService = this.usersListService
    function custromValidator(ngModelValue) {
      const validity = usersListService.uniqueValue('email', ngModelValue)
        ctrl.$setValidity('uniqueEmail', validity)
      return ngModelValue
    }
    ctrl.$parsers = [...ctrl.$parsers, custromValidator]
  }
}
