describe('Testing <input unique-email></input> directive', () => {
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
    const element = angular.element('<form name="editForm"><input name="email" type="email" unique-email ng-model="user.email"/></form>')
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
      const uniqueEmail = 'boris@gmail.com'
      scope.editForm.email.$setViewValue(uniqueEmail)
      scope.$digest()
      expect(scope.user.email).toEqual(uniqueEmail)
      expect(scope.editForm.email.$valid).toBe(true)
    })
    it('should have error with non unique email', () => {
      const uniqueEmail = responseData[0].email
      scope.editForm.email.$setViewValue(uniqueEmail)
      scope.$digest()
      expect(scope.user.email).toEqual(uniqueEmail)
      expect(scope.editForm.email.$valid).toBe(false)
      expect(scope.editForm.email.$error.uniqueEmail).toBe(true)
    })
  })
})
