(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$rootScope', '$cookies'];
    function UserService($rootScope, $cookies) {
        var service = {};

        service.SetUsername = SetUsername;
        service.ResetUsername = ResetUsername;
        service.GetUsername = GetUsername;

        return service;

        function SetUsername(username) {
            /*$rootScope.globals = {
                currentUser: {
                    username: username
                }
            };*/
            $cookies.put("user", username);
        }

        function ResetUsername() {
            //$rootScope.globals = {};
            $cookies.put("user", "");
        }

        function GetUsername() {
            //return $rootScope.globals.currentUser.username;
            return $cookies.get("user");
        }
        
    }

})();
