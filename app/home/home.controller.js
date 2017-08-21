(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .filter('toDateObj', toDateObj);
        //.filter('reverse', reverse);

    HomeController.$inject = ['$location', '$scope', '$http', 'UserService'];
    function HomeController($location, $scope, $http, UserService) {
        var vm = this;
        vm.doLogout = doLogout;
        vm.addComment = addComment;
        vm.syncVotesFunc = syncVotesFunc;

        var uname = UserService.GetUsername();

        var isVotedYes="Y";
        var isVotedNo="N";
        var upVoteValue="1";
        var downVoteValue="2";

        //$scope.newComment = {};

        //vm.comment = {};

        if(uname != null) {
            vm.user = uname;    
        } else {
            alert("Login required!");
        }

        //alert("user is: "+vm.user);
        
        //var obj = JSON.parse(jsonData);
        //var topicList= obj.topicList;
        //vm.topics=jsonData.topicList;
        //this.topics={};
        //vm.topics={};
        //$scope.topics=jsonData.topicList;
        //alert(JSON.stringify(jsonData.topicList));

        initController();

        function initController() {
            getAllTopics();
        }

        function getAllTopics() {

            var topicsUrl = "http://localhost:8080/rest/topic/getAllTopics";
            $scope.success = true;
            //alert("inside getAllTopics...");
            vm.dataLoading = true;

            $http({method: "GET", url: topicsUrl, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                var data = angular.fromJson(response.data)
                if(data.status=="success"){
                    //alert("success");
                    //$scope.topics=data.topicList;
                    //this.topics=data.topicList;
                    vm.topics=data.topicList;

                } else{
                    vm.dataLoading = false;
                    alert("Some error, try again!");
                }

            }, function(response) {
              console.log(response);
              //alert("funcResponse: "+response);
            });
        };

        function addComment(topic) {
            //this.comment = {};
            //this.comment.createdBy = vm.comment.createdBy;
            //alert(JSON.stringify(topic));
            //alert(JSON.stringify(this.comment));
            this.comment['new_comment_field_' + topic.id].createdBy = uname;
            this.comment['new_comment_field_' + topic.id].createdAt = new Date();
            //this.comment.value = vm.comment.value;
            var commentValue = this.comment['new_comment_field_' + topic.id].value;
            //this.comment.value = $scope.commentValue;
            //alert(JSON.stringify(this.comment));

            if(commentValue !=null && commentValue.length >0) {
                topic.commentList.push(this.comment['new_comment_field_' + topic.id]);

                var newCommentURL = "http://localhost:8080/rest/comment/newComment?dataJson=";
                var dataJson= "{\"topicId\":\""+topic.id+"\",\"userName\":\""+vm.user+"\",\"commentValue\":\""+commentValue+"\"}";

                $scope.success = true;
                vm.dataLoading = true;

                $http({method: "POST", url: newCommentURL+dataJson, 
                    headers: {'Access-Control-Allow-Origin':'*'}
                })
                .then(function(response) {
                    if(response.data != null){
                        //

                    } else{
                        //$scope.success = false;
                        alert("Some error, please try again!");
                        vm.dataLoading = false;
                    }

                }, function(response) {
                      console.log(response);
                });
            
            } else {
                alert("Comment value should not be empty!");
            }
            
            this.comment = {};
            //alert(JSON.stringify(this.comment));

        }

        function doLogout() {
            UserService.ResetUsername();
            $location.path('/login');
        }

        function syncVotesFunc(topic, currentVoteValue){
            //var username="swap8";
            var username=UserService.GetUsername();
            //this.topic= vm.topic;
            this.topic= topic;

            var upVoteCount = topic.upVoteCount;
            var downVoteCount = topic.downVoteCount;

            var oldVoteValue = topic.oldVoteValue;

            if(oldVoteValue !=null) { //means user has already voted
                if(oldVoteValue == upVoteValue && currentVoteValue == downVoteValue) {
                    downVoteCount+=1;
                    if(upVoteCount>0){
                        upVoteCount-=1;
                    }

                } else if (oldVoteValue == downVoteValue && currentVoteValue == upVoteValue) {
                    upVoteCount+=1;
                    if(downVoteCount>0){
                        downVoteCount-=1;
                    }
                }

            } else { //means user has not voted yet

                //oldVoteValue = currentVoteValue;
                if(currentVoteValue == upVoteValue) {
                    upVoteCount+=1;
                    if(downVoteCount>0){
                        downVoteCount-=1;
                    }    

                } else if (currentVoteValue == downVoteValue) {
                    downVoteCount+=1;
                    if(upVoteCount>0){
                        upVoteCount-=1;
                    }
                }
            }

            /*if(oldVoteValue == null) {
                oldVoteValue = currentVoteValue;
            }*/
            oldVoteValue = currentVoteValue;

            this.topic.upVoteCount= upVoteCount;
            this.topic.downVoteCount=downVoteCount;
            this.topic.oldVoteValue = oldVoteValue;

            var submitVoteURL = "http://localhost:8080/rest/comment/submitVote?dataJson=";
            var dataJson= "{\"topicId\":\""+topic.id+"\",\"userName\":\""+username+"\",\"voteValue\":\""+currentVoteValue+"\"}";
            
            $http({method: "POST", url: submitVoteURL+dataJson, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                if(response.data != null && response.data == "Forum_SUCCESS"){
                    
                }else{
                    alert("Some error, please try again!");
                }

                }, function(response) {
                  console.log(response);
            });

        }

    }

    //toDateObj.$inject = ['$scope'];
    function toDateObj() {
        return function(dateString) {
            return new Date(dateString);
        };   
    }

    /*function reverse() {
        return function(items) {
            return items.slice().reverse();
        }; 
    }*/

})();



/*
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



*/

