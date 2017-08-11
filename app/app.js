(function () {
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .config(config);
        //.run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/createTopic', {
                controller: 'TopicController',
                templateUrl: 'topic/topic.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }
})();