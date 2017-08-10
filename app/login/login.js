'use strict';

angular.module('myApp.login', ['ngRoute','ngResource'])

/*.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}])*/

.controller('LoginController',LoginController);

LoginController.$inject = ['$location','userData', '$scope', '$http'];


function LoginController($location, userData, $scope, $http) {

	alert("inside login");

	$scope.user={};
	$scope.success=true;

	//var user = this;
	//user.login = login;

	function loginCheck() {
		alert("inside loginCheck()");
	    //user.dataLoading = true;
		var loginUrl="http://localhost:8080/rest/login/checkLogin?dataJson=";
		var dataJson="{\"userName\":\""+$scope.user.uname+"\",\"password\":\""+$scope.user.pwd+"\"}";

		$http({method: "POST", url: loginUrl+dataJson, 
			headers: {'Access-Control-Allow-Origin':'*'}
		})
		.then(function(response) {
			  //console.log(response);
			  //alert(JSON.stringify(response));
	          $scope.res = response.data;
	          //alert("response.data: "+JSON.stringify(response.data));
	          userData.set($scope.res);
	          console.log($scope.res.username);
	          if(response.data){
	          	console.log($scope.res.username);
	            $location.path('/home');

	          } else{
	            $scope.success = false;
	          }

	          //user.dataLoading = false;

	        }, function(response) {
	          console.log(response);
	    });
	}
};
