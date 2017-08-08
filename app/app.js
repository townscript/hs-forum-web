'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.login',
  'myApp.signup',
  'myApp.home',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  	$locationProvider.hashPrefix('!');

	//$routeProvider.otherwise({redirectTo: '/login'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);


/*(function(){
	var app=angular.module('myApp',[]);
	app.controller('HelloController', function(){
		alert("Hello World");
	});
})();*/

