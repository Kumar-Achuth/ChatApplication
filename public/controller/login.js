// var ChatApp = angular.module('loginController', []);
ChatApp.controller('loginCtrl', function($scope, $http , $state) {

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
        // console.log(response)
        // console.log(response.data.Success);
        
        if(response.data.Success==true){
            console.log(response.data.message);
            $scope.message="Login Successful";
         $state.go('Home');

        }
        else if(response.data.Success==false){
            console.log("Username/Password Incorrect");
            $scope.message="Login Unsuccessful"
        }
    },function(response){
        console.log(response)
        $scope.message= response.data.message;
        
    })
    }
});