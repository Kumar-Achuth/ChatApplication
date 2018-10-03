ChatApp.controller('HomeCtrl', function ($scope, $http, $location, SocketService) {
    var mytoken = localStorage.getItem("token");
    var id = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
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
        console.log(response.data.message)
        for (var i = 0; i < (response.data.message).length; i++) {
            arr.push(response.data.message[i].name)
        }
        console.log(arr);
    })
    $scope.arr = arr;

    $scope.sendMessage = function () {
        SocketService.emit('tobackend', { "userid": id, "message": $scope.message, "date": new Date(), "username": username },$scope.message=null)
        console.log(username);
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




