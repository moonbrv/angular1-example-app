export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
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
}
