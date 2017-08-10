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
    //$locationProvider.hashPrefix('!');

    $routeProvider
    .when('/home', {
        controller: 'HomeController',
        templateUrl: 'home/home.html'
        //controllerAs: 'vm'
    })

    .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.html'
        //controllerAs: 'vm'
    })

    .when('/signup', {
        controller: 'signupController',
        templateUrl: 'signup/signup.html'
        //controllerAs: 'vm'
    })

    .when('/topic', {
        controller: 'to[picController',
        templateUrl: 'topic/topic.html'
        //controllerAs: 'vm'
    })

    .otherwise({ redirectTo: '/login' });

    //$routeProvider.otherwise({redirectTo: '/login'});
	//$routeProvider.otherwise({redirectTo: '/home'});
}])
.factory('userData', function() {
 var userSavedData = {};

 var set = function(data) {
  userSavedData = data;
 };

 var get = function() {
  return userSavedData;
 };

 return {
  set: set,
  get: get
 };

});

