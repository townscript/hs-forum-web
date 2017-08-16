(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http'];
    function RegisterController($location, $scope, $http) {
        var vm = this;
        vm.register = register;

        function register() {
            $scope.success = true;
            vm.dataLoading = true;

            var signupUrl="http://localhost:8080/rest/user/newUser?dataJson=";
            var dataJson="{\"userName\":\""+vm.user.username+"\",\"userPassword\":\""+vm.user.password+"\",\"userEmail\":\""+vm.user.email+"\",\"userMobile\":\""+vm.user.mobile+"\",\"userPropic\":\"\"}";

            $http({method: "POST", url: signupUrl+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                  //alert("response.data: "+JSON.stringify(response.data));
                  if(response.data){
                    $location.path('/login');

                  } else{
                    //$scope.success = false;
                    vm.dataLoading = false;
                  }

                }, function(response) {
                  console.log(response);
                });

        };

        function validatePwd(){
            alert("inside register.validatePwd: ");

        }

    }

})();
