describe('<edit-user> component', () => {
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
  // errorUser name have only 2 characters (use this obj to create warnings)
  const errorUser = {
    'id': 5,
    'name': 'py',
    'username': 'goovry',
    'email': 'goove@bumbam.org'
  }

  beforeEach(module('app'))
  let scope, element, ctrl, $httpBackend

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector))
  }

  // inject service because ctrl use it
  beforeEach(inject((_$http_, _usersListService_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_

    $httpBackend
      .when('GET', 'https://jsonplaceholder.typicode.com/users')
      .respond(responseData)

    // usersListService = _usersListService_

    $httpBackend.flush()
  }))

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new()
    element = angular.element('<edit-user></edit-user>')
    element = _$compile_(element)(scope)
    scope.$apply()
    ctrl = element.controller('editUser')
  }))

  it('Should render text', () => {
    const header = findIn(element, 'h3.text-center')
    expect(header.text()).toBe('Add new User')
  })

  // --- TESTING CONTROLLER ---
  describe('testing controller', () => {

    it('Should add new user to array', () => {
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ])
      expect(ctrl.usersListService.users.length).toBe(2)
      ctrl.addUser(e, rightUser)
      expect(ctrl.usersListService.users.length).toBe(3)
    })

    it('Should change user data', () => {
      expect(ctrl.usersListService.users.length).toBe(2)
      const changedUser = {
        'id': 1,
        'name': 'Clark Kent',
        'username': 'Superman',
        'email': 'Sincere@april.biz'
      }
      ctrl.changeUser(changedUser)
      expect(ctrl.usersListService.users.length).toBe(2)
      const findedUser = ctrl.usersListService.users.filter(x => x.id === changedUser.id)[0]
      expect(findedUser.name).toBe(changedUser.name)
      expect(findedUser.username).toBe(changedUser.username)
    })
  })
})
