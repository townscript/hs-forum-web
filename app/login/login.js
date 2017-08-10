'use strict';

angular.module('myApp.login', ['ngRoute','ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$location','userData', '$scope', '$http', function login($location, userData, $scope, $http) {

$scope.user={};
$scope.success=true;

//$scope.login = function() {
//	console.log($scope.user);

var loginUrl="http://localhost:8080/rest/login/checkLogin?dataJson=";
var dataJson="{\"userName\":\""+$scope.user.uname+"\",\"password\":\""+$scope.user.pwd+"\"}";

$http({method: "POST", url: loginUrl+dataJson, 
	headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'*'}
})
.then(function(response) {
		  console.log(response);
		  alert(response);
          $scope.res = response.data;
          userData.set($scope.res);
          console.log($scope.res.username);
          if(typeof $scope.res.username === "string"){
            console.log($scope.res.username);
            $location.path('/home');

          } else{
            $scope.success = false;
          }
        }, function(response) {
          console.log(response);
      });
   
//};

}]);

