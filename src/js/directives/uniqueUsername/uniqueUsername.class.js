/**
 * Class to create directive which add unique username validation to form
 *
 * @export
 * @class uniqueUsername
 */
export default class uniqueUsername {
  constructor(usersListService) {
    'ngInject'
    this.require = 'ngModel'
    this.restrict = 'A'
    this.usersListService = usersListService
  }

  link(scope, elemnt, attr, ctrl) {
    const usersListService = this.usersListService
    function custromValidator(ngModelValue) {
      const validity = usersListService.uniqueValue('username', ngModelValue)
        ctrl.$setValidity('uniqueUsername', validity)
      return ngModelValue
    }
    ctrl.$parsers = [...ctrl.$parsers, custromValidator]
  }
}
