describe('<site-footer> component', () => {

  beforeEach(module('app'))
  let scope, element

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new()
    element = angular.element('<site-footer></site-footer>')
    element = _$compile_(element)(scope)
    scope.$apply()
  }))

  it('Should be defined', () => {
    expect(element).toBeDefined()
  })

  it('Should render text', () => {
    const img = findIn(element, 'footer a img')
    expect(img.length).toBe(1)
  })

})
