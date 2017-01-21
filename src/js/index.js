import 'jquery/dist/jquery.slim.js'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMessages from 'angular-messages'
import {ngTableModule} from 'ng-table'

// import routing config
import routing from './routing/config.js'
import titleChange from './routing/pageTitle.js'

// import service
import usersListService from './services/usersList'

// import components
import siteHeader from './components/site-header'
import siteFooter from './components/site-footer'
import home from './components/home/'
import about from './components/about/'
import editUser from './components/edit-user/'

// import directives
import uniqueEmail from './directives/uniqueEmail'
import uniqueUsername from './directives/uniqueUsername'

// add bootstrap
import 'bootstrap-sass/assets/javascripts/bootstrap.js'

// add stylesheet
import './../scss/style.scss'

// load image
import './../img/github.svg'

// create angular module
angular.module('app', [uiRouter, ngMessages, ngTableModule.name])
  .config(routing)
  .run(titleChange)
  .service('usersListService', usersListService)
  .directive('uniqueEmail', uniqueEmail)
  .directive('uniqueUsername', uniqueUsername)
  .component('siteHeader', siteHeader)
  .component('siteFooter', siteFooter)
  .component('home', home)
  .component('about', about)
  .component('editUser', editUser)
