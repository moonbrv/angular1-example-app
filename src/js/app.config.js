export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject'
  // html5 mode commented out, because i want serve this app on gh-pages, which not support this option yet.
  // $locationProvider.html5Mode(true)
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
