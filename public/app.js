// app.js
var chatApp = angular.module('chatApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider
        .state('Registration', {
            url: 'Registration',
            templateUrl: 'templates/Registration.html'
        })
        .state('Login', {
            url: 'Login',
            templateUrl: 'templates/Login.html'
        })

});