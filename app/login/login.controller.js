(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', '$http'];
    function LoginController($location, $scope, $http) {
        var vm = this;
        vm.login = login;

        function login() {
            $scope.success = true;
            $scope.username=vm.username;
            //alert("inside login...");
            vm.dataLoading = true;

            var loginUrl="http://localhost:8080/rest/login/checkLogin?dataJson=";
            var dataJson="{\"userName\":\""+vm.username+"\",\"password\":\""+vm.password+"\"}";

            $http({method: "POST", url: loginUrl+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                  //alert("response.data: "+JSON.stringify(response.data));
                  //alert("response.data: "+response.data);
                  if(response.data){
                    $location.path('/home');

                  } else{
                    //$scope.success = false;
                    vm.dataLoading = false;
                  }

                }, function(response) {
                  console.log(response);
                  //alert("funcResponse: "+response);
                });

        };
    }

})();
