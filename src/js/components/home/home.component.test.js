describe('<home> component', () => {
  let responseData = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv"
      }
    ]
  beforeEach(module('app'))
  let scope, element, ctrl, $http, $httpBackend, usersListService

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  // inject service because ctrl use it
  beforeEach(inject((_$http_, _usersListService_, _$httpBackend_) => {
    $http = _$http_
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
    const header = findIn(element, '.filter-form__header')
    expect(header.text()).toBe('User\'s filters')
  })
  describe('Testing Controller of component', () => {

    it('controller must be defined', () => {
      expect(ctrl).toBeDefined()
    })

    it('must inject service', () => {
      expect(ctrl.srvc).toEqual(usersListService)
    })

    it('default sortType must be \'name\'', () => {
      expect(ctrl.sortType).toBe('name')
    })

    it('default reverse order must be \'false\'', () => {
      expect(ctrl.sortReverse).toBe(false)
    })

    it('must set sort type to \'username\' and set reverse order to \'false\'', () => {
      ctrl.setOrder('username')
      expect(ctrl.sortType).toBe('username')
      expect(ctrl.sortReverse).toBe(false)
    })

  })

})
