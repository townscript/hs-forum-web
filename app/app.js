'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.signup',
  'myApp.home',
  'myApp.topic',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  	$locationProvider.hashPrefix('!');

	$routeProvider.otherwise({redirectTo: '/login'});
	//$routeProvider.otherwise({redirectTo: '/home'});
}]);


