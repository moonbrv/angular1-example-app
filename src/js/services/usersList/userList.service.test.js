describe('Test: UserList.service', () => {
  beforeEach(module('app'))

  describe('User list service', () => {
    let usersListService, $http, $httpBackend
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

    const wrongUser = {
        name: 'Ivan Smith',
        username: 'bret',
        email: 'smith@mail.mail'
      }

    beforeEach(inject((_$http_, _$httpBackend_, _usersListService_) => {
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

    it('Service must be defined', () => {
      expect(usersListService).toBeDefined
    })

    it('Method: getUsers - Successful get user data and save it', () => {
      $httpBackend.expectGET('https://jsonplaceholder.typicode.com/users')
      usersListService.getUsers($http)
      $httpBackend.flush()
      expect(usersListService.users.length).toBe(2)
    })

    it('Method: deleteUser - Remove user from array', () => {
      usersListService.deleteUser(1)
      expect(usersListService.users.length).toEqual(1)
      usersListService.deleteUser(2)
      expect(usersListService.users.length).toEqual(0)
    })

    it('Method: getId - should create new unique ID for new user', () => {
      const ID = usersListService.getId()
      usersListService.users.forEach(x => {
        expect(x.id).not.toEqual(ID)
      })
    })

    it('Method: addUser - should add new user object to array', () => {
      const newUser = {
        name: 'Ivanov Peter',
        username: 'havok123',
        email: 'havok123@mail.mail'
      }

      usersListService.addUser(newUser)
      expect(usersListService.users.length).toEqual(3)
      expect(usersListService.users[2].id).toEqual(3)
      expect(usersListService.users[2].name).toEqual(newUser.name)
      expect(usersListService.users[2].username).toEqual(newUser.username)
    })

    it('Method: uniqueValue - should return false on non-unique username', () => {
      expect(usersListService.uniqueValue('username', wrongUser.username)).toBe(false)
    })

    it('Method: uniqueValue - should return true on unique email', () => {
      expect(usersListService.uniqueValue('username', wrongUser.email)).toBe(true)
    })

  })

})
