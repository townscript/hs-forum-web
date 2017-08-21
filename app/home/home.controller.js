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
        //vm.user = null;
        vm.doLogout = doLogout;
        vm.addComment = addComment;
        vm.syncVotesFunc = syncVotesFunc;

        var uname = UserService.GetUsername();

        var isVotedYes="Y";
        var isVotedNo="N";
        var upVoteValue="1";
        var downVoteValue="2";

        if(uname != null) {
            vm.user = uname;    
        } else {
            alert("Login required!");
        }

        initController();

        function initController() {
            getAllTopics();
        }

        function getAllTopics() {

            var topicsUrl = "http://localhost:8080/rest/topic/getAllTopics";
            $scope.success = true;
            vm.dataLoading = true;

            $http({method: "GET", url: topicsUrl, 
                headers: {'Access-Control-Allow-Origin':'*'}
            })
            .then(function(response) {
                  //console.log(response);
                var data = angular.fromJson(response.data)
                if(data.status=="success"){
                    vm.topics=data.topicList;

                } else{
                    alert("Some error, try again!");
                }
                vm.dataLoading = false;

            }, function(response) {
              console.log(response);
            });
        };

        function addComment(topic) {

            this.comment['new_comment_field_' + topic.id].createdBy = uname;
            this.comment['new_comment_field_' + topic.id].createdAt = new Date();
            
            var commentValue = this.comment['new_comment_field_' + topic.id].value;

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
        }

        function doLogout() {
            UserService.ResetUsername();
            $location.path('/login');
        }

        function syncVotesFunc(topic, currentVoteValue){
            var username=UserService.GetUsername();
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

    function toDateObj() {
        return function(dateString) {
            return new Date(dateString);
        };
    }

    /*function reverse() {
        return function(items) {
            //return items.slice().reverse();
            return items.reverse();
        };
    }*/

})();
