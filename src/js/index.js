import $ from 'jquery/dist/jquery.slim.js'
import angular from 'angular'
import uiRouter from 'angular-ui-router'

// import routing config
import routing from './app.config.js'

// import service
import usersListService from './services/usersList.service.js'

// import components
import siteHeader from './components/site-header'
import siteFooter from './components/site-footer'
import home from './components/home/'
import about from './components/about/'
import editUser from './components/edit-user/'

// add jquery
window.jQuery = $

// add bootstrap
require('bootstrap-sass/assets/javascripts/bootstrap.js')

// add stylesheet
require('./../scss/style.scss')

// load image
require('./../img/github.svg')

// create angular module
angular.module('app', [uiRouter])
  .config(routing)
  .service('usersListService', usersListService)
  .component('siteHeader', siteHeader)
  .component('siteFooter', siteFooter)
  .component('home', home)
  .component('about', about)
  .component('editUser', editUser)
