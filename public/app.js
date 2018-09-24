var ChatApp = angular.module('ChatApp', ['ui.router','registerController', 'loginController']);

ChatApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider

        .state('Registration', {
            url: '/Registration',
            templateUrl: 'template/Registration.html',
            controller : 'registerCntrl'
        })
        .state('Login', {
            url: '/Login',
            templateUrl: 'template/Login.html',
            controller : 'loginCntrl'
        })
});