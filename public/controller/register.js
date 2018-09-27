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
        // console.log(response.data.Success);
        
        if(response.data.error==false){
            console.log(response.data.message);
            $scope.message="Registration Successful";
            // $state.go("/Login")
        }
        else if(response.data.error==true){
            console.log("Invalid Credentials")
            $scope.message="Registration unsuccessful";
        }
    
    },function(response){
        console.log(response)
        $scope.message=response.data.message;
    })
}  
});