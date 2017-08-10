'use strict';

angular.module('myApp.login', ['ngRoute','ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$location','userData', '$scope', '$http', function loginCheck($location, userData, $scope, $http) {

	alert("inside loginCheck()");

$scope.user={};
$scope.success=true;

/*
$http({method: "GET", url: "/Todolist/user/checksession", headers: {'Access-Control-Allow-Origin':'*'}})
.then(function(response) {
          console.log(response);
          $scope.checksession = response.data;
          console.log($scope.checksession);
          if($scope.checksession != -99){
            console.log($scope.checksession);
            $location.path('/dashboard');
          } 
        }, function(response) {
          console.log(response);
});
*/

//$scope.login = function() {
//	console.log($scope.user);

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
        }, function(response) {
          console.log(response);
      });
   
//};

}]);

