import $ from 'jquery'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import routing from './app.config.js'

import usersListService from './services/usersList.service.js'
import tableCtrl from './controllers/table.controller.js'

// add jquery
window.jQuery = $

// add bootstrap
require('bootstrap-sass/assets/javascripts/bootstrap.js')

// add stylesheet
require('./../scss/style.scss')

// create angular module
angular.module('app', [uiRouter])
  .config(routing)
  .service('usersListService', usersListService)
  .controller('tableCtrl', tableCtrl)
