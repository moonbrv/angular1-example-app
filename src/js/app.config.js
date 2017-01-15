export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject'
  // html5 mode commented out, because i want serve this app on gh-pages, which not support this option yet.
  // if you will enable this option, don't forget include <base href="/"> tag inside index.html, in head.
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
    .state('editUser', {
      url: '/edit-user',
      component: 'editUser'
    })
    .state('edit', {
      url: '/{userId}',
      component: 'editUser',
      resolve: {
        editedUser: (usersListService, $stateParams, $location) => usersListService.users.filter(x => x.id === Number($stateParams.userId))[0]
      }
    })
}
