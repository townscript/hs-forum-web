﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http'];
    function RegisterController($location, $scope, $http) {
        alert("inside register");
        var vm = this;

        vm.register = register;

        function register() {
            alert("inside register....");
            //vm.dataLoading = true;
            /*UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });*/
            //$location.path('/login');
        }

        function validatePwd(){
            alert("inside register.validatePwd: ");
           // alert("pwd: "+vm.user.password);

        }

    }

})();
