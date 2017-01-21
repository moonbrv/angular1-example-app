describe('<home> component', () => {
  let responseData = [
      {
        'id': 1,
        'name': 'Leanne Graham',
        'username': 'Bret',
        'email': 'Sincere@april.biz'
      },
      {
        'id': 2,
        'name': 'Ervin Howell',
        'username': 'Antonette',
        'email': 'Shanna@melissa.tv'
      }
    ]
  beforeEach(module('app'))
  let scope, element, ctrl, $httpBackend, usersListService

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  // inject service because ctrl use it
  beforeEach(inject((_usersListService_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_

    $httpBackend
      .when('GET', 'https://jsonplaceholder.typicode.com/users')
      .respond(responseData)

    usersListService = _usersListService_

    $httpBackend.flush()

  }))

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new()
    element = angular.element('<home></home>')
    element = _$compile_(element)(scope)
    scope.$apply()
    ctrl = element.controller('home')
  }))

  it('Should render text', () => {
    const header = findIn(element, 'h2.text-center')
    expect(header.text()).toBe('User\'s Manager')
  })

  // --- TESTING CONTROLLER ---
  describe('Testing Controller of component', () => {

    it('controller must be defined', () => {
      expect(ctrl).toBeDefined()
    })

    it('must inject service', () => {
      expect(ctrl.usersListService).toEqual(usersListService)
    })

    it('Method: removeUser - must remove user from service and table', () => {
      let rows = angular.element(element[0].querySelectorAll('tbody tr'))
      expect(rows['length']).toBe(2)
      expect(ctrl.tableParams.settings().dataset.length).toBe(2)
      expect(ctrl.usersListService.users.length).toBe(2)
      ctrl.removeUser(1)
      scope.$apply()
      rows = angular.element(element[0].querySelectorAll('tbody tr'))
      expect(ctrl.tableParams.settings().dataset.length).toBe(1)
      expect(rows['length']).toBe(1)
      expect(ctrl.usersListService.users.length).toBe(1)
    })

  })

})
