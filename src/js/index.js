import angular from 'angular'

// add jquery
window.$ = window.jQuery = require('jquery')

// add bootstrap
require('bootstrap-sass/assets/javascripts/bootstrap.js')

// add stylesheet
require('./../scss/style.scss')

angular.module('app', [])
