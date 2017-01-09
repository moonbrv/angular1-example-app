describe('<home> component', () => {
  let responseData = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      }
    ]
  beforeEach(module('app'))
  let scope, element
  let $http, $httpBackend, usersListService

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(inject((_$http_, _usersListService_, _$httpBackend_) => {
    $http = _$http_
    $httpBackend = _$httpBackend_

    $httpBackend
      .when('GET', 'https://jsonplaceholder.typicode.com/users')
      .respond(responseData)

    usersListService = _usersListService_

    $httpBackend.flush()

  }))

  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new()
    element = angular.element('<home></home>')
    element = _$compile_(element)(scope)
    scope.$digest()
  }))

  it('Should render text', () => {
    const header = findIn(element, '.filter-form__header')
    expect(header.text()).toBe('User\'s filters')
  })
})
