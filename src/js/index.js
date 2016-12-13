import angular from 'angular'
import uiRouter from 'angular-ui-router'
import routing from './app.config.js'

// add jquery
window.$ = window.jQuery = require('jquery')

// add bootstrap
require('bootstrap-sass/assets/javascripts/bootstrap.js')

// add stylesheet
require('./../scss/style.scss')

angular.module('app', [uiRouter])
  .config(routing)
