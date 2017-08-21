(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', '$rootScope', '$http', 'UserService'];
    function LoginController($location, $scope, $rootScope, $http, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            $scope.success = true;
            vm.dataLoading = true;

            var loginUrl="http://localhost:8080/rest/login/checkLogin?dataJson=";
            var dataJson="{\"userName\":\""+vm.username+"\",\"password\":\""+vm.password+"\"}";

            $http({method: "POST", url: loginUrl+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                  if(response.data){
                    UserService.SetUsername(vm.username);
                    $location.path('/home');

                  } else{
                    //$scope.success = false;
                    vm.dataLoading = false;
                  }

                }, function(response) {
                  console.log(response);
            });

        };
    }

})();
