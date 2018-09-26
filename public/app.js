var ChatApp = angular.module('ChatApp', ['ui.router']);

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
            controller : 'loginCtrl'
        })
        .state('Home',{
            url : '/Home',
            templateUrl : '/template/Home.html',
            controller : 'HomeCtrl'
        })
});