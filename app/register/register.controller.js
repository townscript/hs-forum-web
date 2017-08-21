(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http'];
    function RegisterController($location, $scope, $http) {

        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.mobileFormat = /^((\+?(\d{2})([-]|[ ])?)|[0]?)?\d{10}$/;
        
        var vm = this;
        vm.register = register;
        vm.validatePwd = validatePwd;

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
            var pwd1= vm.user.password
            var pwd2= vm.user.password2
            if( pwd1 == null &&  pwd2 == null ) {
              alert("Passwords should not be empty!");
            } else if( pwd1 == null ) {
              alert("Password should not be empty!");
            } else if( pwd2 == null ) {
              alert("Password2 should not be empty!");
            } else if ( pwd1 != pwd2 ) {
              alert("Both paswords should be same!");
              vm.user.password = "";
              vm.user.password2 = "";
            }
        }

    }

})();
