(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .filter('toDateObj', toDateObj);

    HomeController.$inject = ['$location', '$scope', '$http'];
    function HomeController($location, $scope, $http) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        //vm.deleteUser = deleteUser;

        var jsonData={  "status" : "success",
                        "topicList" : [
                                       {
                                           "id":"1",
                                           "title":"pune marathon in july 2017",
                                           "description":"this topic is based on the the marathod happened in pune in july 2017. want to know reviews on the same.",
                                           "createdAt":"2017-07-23 16:11:10",
                                           "createdBy":"Swapnil Solanki",
                                           "upVoteCount":"10",
                                           "downVoteCount":"3",
                                           "isVoted":"Y",
                                           "voteValue":"1",
                                           "tags":"sports",
                                           "topicUrl":"testTopic1",
                                           "topicId":"1",
                                           "commentList" :[
                                                           {
                                                               "id":"1",
                                                               "type":"T",
                                                               "value":"awesome marathon",
                                                               "createdAt":"2017-07-24 16:11:10",
                                                               "createdBy":"punjabi"
                                                           },
                                                           {
                                                               "id":"3",
                                                               "type":"T",
                                                               "value":"loved it!",
                                                               "createdAt":"2017-07-25 12:11:10",
                                                               "createdBy":"Ankit"
                                                           }
                                                           ]
                                       } ,
                                       {
                                           "id":"2",
                                           "title":"TEDx event in Mumbai",
                                           "description":"i want to know more details about TEDx event happened in mumbai in April 2017",
                                           "createdAt":"2017-07-21 16:11:10",
                                           "createdBy":"Himanshu Singh",
                                           "upVoteCount":"20",
                                           "downVoteCount":"7",
                                           "isVoted":"Y",
                                           "voteValue":"2",
                                           "tags":"general",
                                           "topicUrl":"testTopic2",
                                           "topicId":"2",
                                           "commentList" :[
                                                           {
                                                               "id":"2",
                                                               "type":"T",
                                                               "value":"it is nice one!",
                                                               "createdAt":"2017-07-22 16:11:10",
                                                               "createdBy":"balaji"
                                                           }
                                                           ]
                                       },
                                       {
                                           "id":"3",
                                           "title":"IEEE event at IISc bangalore",
                                           "description":"how was the IEEE event happened at IISc bangalore June 2017?",
                                           "createdAt":"2017-07-11 16:11:10",
                                           "createdBy":"Sushant Pawar",
                                           "upVoteCount":"15",
                                           "downVoteCount":"5",
                                           "isVoted":"N",
                                           "voteValue":"0",
                                           "tags":"technical",
                                           "topicUrl":"testTopic3",
                                           "topicId":"3",
                                           "commentList" :[
                                                           {
                                                               "id":"4",
                                                               "type":"T",
                                                               "value":"really good one!",
                                                               "createdAt":"2017-07-22 16:11:10",
                                                               "createdBy":"Aakash"
                                                           }
                                                           ]
                                       }
                                       ]
                };

        //var obj = JSON.parse(jsonData);
        //var topicList= obj.topicList;
        //vm.topics=jsonData.topicList;
        this.topics=jsonData.topicList;
        $scope.topics=jsonData.topicList;
        //alert(this.topics[0].description);

        //alert(JSON.stringify(jsonData.topicList));

        initController();

        function initController() {
            getAllTopics();
        }

        function getAllTopics() {
            var topicsUrl = "http://localhost:8080/forum-api/topic/getAllTopics";

            
        }

        function Ctrl($scope) {
            $scope.date = new Date("1990-11-25 14:35:00");
        }

        function syncVotesFunc4Up(){
            alert("inside syncVotesFunc4Up");
        }

    }

    //toDateObj.$inject = ['$scope'];
    function toDateObj() {
        return function(dateString) {
            return new Date(dateString);
        };   
    }

})();
