'use strict';

var app = angular
 .module('AdminApp', [
   'ngRoute',
   'LocalStorageModule',
   'ui.bootstrap',
   'ui.router'
 ])
 .config(function ($routeProvider, $stateProvider) {
      
     $stateProvider
         .state('home', {
             url: '',
             templateUrl: 'Scripts/app/controller/deal/deals.html',
             controller: 'DealController',
             data: {
                 requireLogin: true
             }
         }).state('dealcurrentstatus', {
             url: '/dealcurrentstatus',
             templateUrl: 'Scripts/app/controller/dealcurrentstatus/dealcurrentstatus.html',
             controller: 'DealCurrentStatusController',
             data: {
                 requireLogin: true
             }
         })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        });

     $routeProvider
       .when('/', {
           templateUrl: 'views/main.html',
           controller: 'MainCtrl'
       })
       .when('/user', {
           templateUrl: 'views/about.html',
           controller: 'AboutCtrl'
       });

       //.otherwise({
       //    redirectTo: '/'
       //});
 });
var serviceBase = '';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
//app.config(function ($httpProvider) {
//    $httpProvider.interceptors.push('authInterceptorService');
//});
app.run(['$rootScope', '$location', '$http',
		function ($rootScope, $location,  $http) {
		    $rootScope.isAuthenticated = sessionStorage.getItem("lastname");
		}
 ]);

