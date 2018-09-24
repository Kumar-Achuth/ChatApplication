var ChatApp = angular.module('loginController', []);
ChatApp.controller('loginCtrl', function($scope, $http) {

    console.log('login');
    $scope.user={
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function(){
        console.log("login calling", $scope.user);
    $http({
        method: 'POST',
        url: '/login',
        data: $scope.user
    }).then(function(response){
        console.log(response.data.Success);
        
        if(response.data.Success==true){
            console.log("successful");
            $scope.message="Login Successful";
        $state.go('home')

        }
        else if(response.status==404){
            console.log("unsuccessful");
            $scope.message="Login Unsuccessful"
        }
    })
    }

});