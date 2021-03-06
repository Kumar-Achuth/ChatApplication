ChatApp.controller('HomeCtrl', function ($scope, $http, $location, SocketService, $state) {
    var mytoken = localStorage.getItem("token");
    var id = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
    $scope.value = 0;
    console.log("id is" + id)
    var arr = [];
    var msgArr = [];

    $scope.currUser = username;
    $http({
        method: 'GET',
        url: 'auth/users/' + id + '/list',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        // console.log(response.data.message)
        // for (var i = 0; i < (response.data.message).length; i++) {
        //     arr.push(response.data.message[i].name)
        // }
        // console.log(arr);
        arr = response.data.message;
        $scope.arr = arr;
    })
    $scope.person=function(userData){
        localStorage.setItem('rusername',userData.name);
        localStorage.setItem('ruserId',userData.userid);
        $location.path('/singleChat');
    }

    $scope.sendMessage = function () {
        SocketService.emit('tobackend', { "userid": id, "message": $scope.message, "date": new Date(), "username": username },$scope.message=null)
        console.log(username);
    }
    $scope.toNames =function(key)
    {
        console.log(key)
        $scope.value=1;
    }
    $http({
        method: 'GET',
        url: 'auth/users/ ' + id + ' /msgs',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        console.log(response.data.message[0])
        for (var i = 0; i < (response.data.message).length; i++)
            msgArr.push(response.data.message[i]);
    })
    $scope.msgArr = msgArr;
    $scope.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        $location.path('/login');
    }
    SocketService.on('tofrontend', function (msg) {
        $scope.msgArr.push(msg);
    })

})
