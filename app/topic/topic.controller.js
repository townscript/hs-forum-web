(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopicController', TopicController);

    TopicController.$inject = ['$location', '$scope', '$http', 'UserService'];
    function TopicController($location, $scope, $http, UserService) {
        var vm = this;
        vm.createTopic = createTopic;
        vm.doLogout = doLogout;
        /*var uname= $scope.username;*/
        //var uname= "swap8";
        var uname = UserService.GetUsername();
        
        if(uname != null) {
            vm.user = uname;    
        } else {
            alert("Login required!");
        }

        //alert("username: "+uname);
        
        function createTopic() {
            $scope.success = true;
            vm.dataLoading = true;

            var createTopicUrl="http://localhost:8080/rest/topic/createTopic?dataJson=";
            var dataJson="{\"title\":\""+vm.topic.title+"\",\"description\":\""+vm.topic.description+"\",\"userName\":\""+uname+"\",\"tags\":\""+vm.topic.tags+"\"}";

            $http({method: "POST", url: createTopicUrl+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                  //alert("response.data: "+JSON.stringify(response.data));
                  if(response.data != null){
                    $location.path('/home');

                  } else{
                    //$scope.success = false;
                    vm.dataLoading = false;
                  }

                }, function(response) {
                  console.log(response);
                });

        };

        function doLogout() {
            UserService.ResetUsername();
            $location.path('/login');
        }

    }

})();
