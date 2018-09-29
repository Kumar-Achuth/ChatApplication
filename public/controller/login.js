// var ChatApp = angular.module('loginController', []);
ChatApp.controller('loginCtrl', function ($scope, $http, $state) {

    console.log('login');
    $scope.user = {
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function () {
        console.log("login calling", $scope.user);
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        }).then(function (response) {
            // console.log(response)
            // console.log(response.data.Success);

            if (response.data.Success == true) {   // check for the response from back end 
                console.log(response.data.message);
                $scope.message = "Login Successful";  // if the login is successfull then true 
                var id = response.data.userid
                localStorage.setItem('userid', id);  // set the userid in the local storage 
                var token = response.data.token
                localStorage.setItem('token', token);  // set the token in the local storage 

                $state.go('Home');

            }
            else if (response.data.Success == true) {
                console.log("Username/Password Incorrect");  // check for the condition in the back end 
                $scope.message = "Login Unsuccessful"// if the condition is false display incorrect password 
            }
        }, function (response) {
            console.log(response)
            $scope.message = response.data.message;

        })
    }
});