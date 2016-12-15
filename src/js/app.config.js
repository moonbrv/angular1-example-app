export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './../templates/home.html',
      controller: 'tableCtrl',
      controllerAs: 'tableCtrl'
    })
    .state('aboutApp', {
      url: '/about_app',
      templateUrl: './../templates/aboutApp.html'
    })
    .state('aboutAuthor', {
      url: '/about_author',
      templateUrl: './../templates/aboutAuthor.html'
    })
}
