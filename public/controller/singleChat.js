// var chatApp = angular.module('singleChatController', []);
ChatApp.controller('singleChatCntrl', function ($scope, $http, $state, SocketService, $location) {
    var senderId = localStorage.getItem('userid');
    var senderName = localStorage.getItem('username');
    var receiverId = localStorage.getItem('ruserId');
    var receiverName = localStorage.getItem('rusername');
    var mytoken = localStorage.getItem("token");
    var id = localStorage.getItem("userid");
    $scope.message = '';
    $scope.val = receiverName;
    var arr = [];
    

    $http({
        method: 'GET',
        url: 'auth/users/' + id + '/list',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        console.log(response.data.message)
        for (var i = 0; i < (response.data.message).length; i++) {
            arr.push(response.data.message[i].name)
        }
        console.log(arr);
    })

    $scope.close = function () {
        $state.go('home');
        localStorage.removeItem('ruserId');
        localStorage.removeItem('rusername');
    }
    // $scope.person=function(username,userid){
    //     localStorage.setItem('rusername',username);
    //     localStorage.setItem('ruserId',userid);
    //     $location.path('/singleChat');
    // }

    uname = [];
    uname.push(senderName + " : " + receiverName);
    $scope.userName = uname;
    var response={};
    $scope.chatlist = [];
    // var chatlist = new Array();
    $scope.send = function () {
        console.log($scope.message);
        console.log("message");

        SocketService.emit('singleChatBackend', { 'senderId': senderId, 'senderName': senderName, 'receiverId': receiverId, 'receiverName': receiverName, 'message': $scope.message, 'date': new Date() })
        $scope.chatlist.push({ 'senderId': senderId, 'senderName': senderName, 'receiverId': receiverId, 'receiverName': receiverName, 'message': $scope.message, 'date': new Date() })
        $scope.message = null;
    }
    

    $http({


        method: 'GET',
        url: '/users/singleChatlist/' + receiverId + '/and/' + senderId,

    }).then(function (response) {


        //console.log(response.data.message[0].message);
        for (var i = 0; i < response.data.message.length; i++) {

            chatlist.push(response.data.message[i])
        }
        $scope.chatlist = response.data.message;

    })
    // console.log(response.data)

    SocketService.on(senderId, function (msg) {

        console.log(msg);
        $scope.chatlist.push(msg)
    });
    // $scope.logout = function () {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('userid');
    //     $location.path('/login');
    // }

    $scope.currUser = senderName;

})