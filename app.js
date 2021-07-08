'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'myApp.category',
    'myApp.product',
    'myApp.rawmaterial',
    'myApp.materialsupplier',
])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({ redirectTo: '/!' });
    }]);
