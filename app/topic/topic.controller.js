(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopicController', TopicController);

    TopicController.$inject = [/*'UserService', */'$location'/*, '$rootScope', 'FlashService'*/];
    function TopicController(/*UserService, */$location/*, $rootScope, FlashService*/) {
        var vm = this;
        
        vm.topic = topic;
        
        function topic() {
            alert("inside topic");
            /*vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });*/
        }
    }

})();
