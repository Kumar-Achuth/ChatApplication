var ChatApp = angular.module('ChatApp', ['ui.router','btford.socket-io']);

ChatApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');  // route to this url otherwise  
    
    $stateProvider             // state provider gives current state 

        .state('registration', {
            url: '/registration',
            templateUrl: 'template/registration.html',
            controller: 'registerCntrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: '/template/home.html',
            controller: 'HomeCtrl'
        })
});
ChatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);

