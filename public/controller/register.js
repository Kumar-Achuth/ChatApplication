// var ChatApp = angular.module('registerController', []);
ChatApp.controller('registerCntrl', function($scope, $http) {
   // console.log('register');
    $scope.user={
        'firstname': '',
        'lastname': '',
        'mobile': '',
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.register = function(){
        console.log("register calling", $scope.user);
    $http({
        method: 'POST',
        url: '/register',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data.Success);
        
        if(response.data.Success==true){
            console.log("successful");
            $scope.message="Registration Successful";
        }
        else if(response.data.Success==false){
            console.log(response.data.Success)
            $scope.message=response.data.message;
        }
    })
    }
    
});