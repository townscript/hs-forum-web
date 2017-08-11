(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopicController', TopicController);

    TopicController.$inject = ['$location', '$scope', '$http'];
    function TopicController($location, $scope, $http) {
        /*var uname= $scope.username;*/
        var uname= "swap8";
        //alert("username: "+uname);
        var vm = this;
        vm.createTopic = createTopic;
        //alert("inside TopicController");
        function createTopic() {
            $scope.success = true;
            vm.dataLoading = true;

            //alert("topic-title: "+vm.topic.title);
            var createTopicUrl="http://localhost:8080/rest/topic/createTopic?dataJson=";
            var dataJson="{\"title\":\""+vm.topic.title+"\",\"description\":\""+vm.topic.description+"\",\"userName\":\""+uname+"\",\"tags\":\""+vm.topic.tags+"\"}";

            $http({method: "POST", url: createTopicUrl+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                  //alert("response.data: "+JSON.stringify(response.data));
                  //alert("response.data: "+response.data);
                  if(response.data != null){
                    $location.path('/home');

                  } else{
                    //$scope.success = false;
                    vm.dataLoading = false;
                  }

                }, function(response) {
                  console.log(response);
                  //alert("funcResponse: "+response);
                });

        };
    }

})();
