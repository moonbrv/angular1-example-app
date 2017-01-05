import $ from 'jquery'
import angular from 'angular'
import uiRouter from 'angular-ui-router'

// import routing config
import routing from './app.config.js'

// import service
import usersListService from './services/usersList.service.js'

// import components
import home from './components/home/home.component.js'
import about from './components/about/about.component.js'
import addUser from './components/add-user/add-user.component.js'

// add jquery
window.jQuery = $

// add bootstrap
require('bootstrap-sass/assets/javascripts/bootstrap.js')

// add stylesheet
require('./../scss/style.scss')

// add angular-mocks in development to tests
if (__TEST__) {
  require('angular-mocks/angular-mocks.js')
}

// create angular module
angular.module('app', [uiRouter])
  .config(routing)
  .service('usersListService', usersListService)
  .component('home', home)
  .component('about', about)
  .component('addUser', addUser)
