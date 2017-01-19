describe('Testing <input unique-username></input> directive', () => {
  let compile, scope, directiveElem, $http, $httpBackend, usersListService
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

  function getCompiledElement() {
    const element = angular.element('<form name="editForm"><input name="username" type="text" unique-username ng-model="user.username"/></form>')
    const compiledElement = compile(element)(scope)
    scope.$digest()
    return compiledElement
  }

  beforeEach(() => {
    module('app')
    inject((_$compile_, _$rootScope_, _$http_, _$httpBackend_, _usersListService_) => {
      compile = _$compile_
      scope = _$rootScope_.$new()
      $http = _$http_
      $httpBackend = _$httpBackend_

      $httpBackend
        .when('GET', 'https://jsonplaceholder.typicode.com/users')
        .respond(responseData)

      usersListService = _usersListService_

      $httpBackend.flush()
    })

    directiveElem = getCompiledElement()
  })

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()
    })

  it('should be defined', () => {
    expect(directiveElem).toBeDefined()
  })

  describe('test validator' ,() => {
    it('should pass with unique email', () => {
      const uniqueUsername = 'Victor'
      scope.editForm.username.$setViewValue(uniqueUsername)
      scope.$digest()
      expect(scope.user.username).toEqual(uniqueUsername)
      expect(scope.editForm.username.$valid).toBe(true)
    })
    it('should have error with non unique email', () => {
      const uniqueUsername = responseData[0].username
      scope.editForm.username.$setViewValue(uniqueUsername)
      scope.$digest()
      expect(scope.user.username).toEqual(uniqueUsername)
      expect(scope.editForm.username.$valid).toBe(false)
      expect(scope.editForm.username.$error.uniqueUsername).toBe(true)
    })
  })
})
