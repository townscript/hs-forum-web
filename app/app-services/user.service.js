﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$rootScope'];
    function UserService($rootScope) {
        var service = {};

        service.SetUsername = SetUsername;
        service.ResetUsername = ResetUsername;
        service.GetUsername = GetUsername;

        return service;

        function SetUsername(username) {
            $rootScope.globals = {
                currentUser: {
                    username: username
                }
            };
        }

        function ResetUsername() {
            $rootScope.globals = {};
        }

        function GetUsername() {
            //return $rootScope.globals.currentUser.username;
            return "swap8";
        }
        
    }

})();
