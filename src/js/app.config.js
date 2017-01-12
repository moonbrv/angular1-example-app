export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject'
  $locationProvider.html5Mode({
    enabled: true,
    rewriteLinks: true,
    requireBase: true
  })
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })
    .state('about', {
      url: '/about',
      component: 'about'
    })
    .state('addUser', {
      url: '/add-user',
      component: 'addUser'
    })
    .state('edit', {
      url: '/{userId}',
      component: 'addUser',
      resolve: {
        editedUser: (usersListService, $stateParams, $location) => usersListService.users.filter(x => x.id === Number($stateParams.userId))[0]
      }
    })
}
