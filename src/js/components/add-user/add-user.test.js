describe('<add-user> component', () => {
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

  const rightUser = {
    'id': 3,
    'name': 'Fill Smith',
    'username': 'Filly',
    'email': 'filly@bumbam.org'
  }
  // wrongUser have existing username
  const wrongUser = {
    'id': 4,
    'name': 'Kevin Nill',
    'username': 'bret',
    'email': 'kev@bumbam.org'
  }
  const errorUser = {
    'id': 5,
    'name': 'py',
    'username': 'goovry',
    'email': 'goove@bumbam.org'
  }

  beforeEach(module('app'))
  let scope, element, ctrl, $http, $httpBackend, usersListService

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector))
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
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new()
    element = angular.element('<add-user></add-user>')
    element = _$compile_(element)(scope)
    scope.$apply()
    ctrl = element.controller('addUser')
  }))

  it('Should render text', () => {
    const header = findIn(element, 'h3.text-center')
    expect(header.text()).toBe('Add new User')
  })

  // --- TESTING CONTROLLER ---
  describe('testing controller', () => {

    it('Must have no warnings about minimal username length of good userObj', () => {
      ctrl.haveMinimalLength('username', rightUser)
      expect(ctrl.warnings.username).toBe('')
    })

    it('Must have warnings about minimal name length of bad userObj, of not important field', () => {
      ctrl.haveMinimalLength('name', errorUser)
      expect(ctrl.warnings.name).toBe(`Minimal length 3 symbols`)
    })

    it('Must have warnings about minimal name length of bad userObj, of important field', () => {
      ctrl.haveMinimalLength('name', errorUser, 3, true)
      expect(ctrl.warnings.name).toBe(`You must enter atleast 3 symbols`)
    })

  })
})
