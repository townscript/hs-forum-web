(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http'];
    function RegisterController($location, $scope, $http) {
        //alert("inside register");
        var vm = this;

        //vm.register = register;

        function register() {
            $scope.success = true;
            alert("inside register...");
            vm.dataLoading = true;

            var signupUrl="http://localhost:8080/rest/user/newUser?dataJson=";

            alert("username: "+vm.user.username + " ;password: "+vm.user.password);
            //var dataJson="{\"userName\":\""+vm.user.username+"\",\"password\":\""+vm.user.password+"\"}";
            var dataJson="{\"userName\":\""+vm.user.username+"\",\"userPassword\":\""+vm.user.password+"\",\"userEmail\":\""+vm.user.email+"\",\"userMobile\":\""+vm.user.mobile+"\",\"userPropic\":\"\"}";



            $http({method: "POST", url: signupUrl+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                  //alert("response.data: "+JSON.stringify(response.data));
                  //alert("response.data: "+response.data);
                  if(response.data){
                    $location.path('/login');

                  } else{
                    //$scope.success = false;
                    vm.dataLoading = false;
                  }

                }, function(response) {
                  console.log(response);
                  //alert("funcResponse: "+response);
                });

        };

        function validatePwd(){
            alert("inside register.validatePwd: ");
           // alert("pwd: "+vm.user.password);

        }

    }

})();
