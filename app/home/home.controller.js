(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', '$scope', '$http'];

    function HomeController($location, $scope, $http) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        //vm.deleteUser = deleteUser;

        initController();

        function initController() {
            getAllTopipcs();
        }

        function getAllTopipcs() {
            var topicsUrl = "http://localhost:8080/forum-api/topic/getAllTopics";

            

            
        }
    }

})();