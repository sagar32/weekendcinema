(function() {
        'use strict'
        //module
        angular.module("myApp", ['ngRoute','ui.bootstrap']);

        angular.module("myApp").config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'home.html',
                    controller: 'homeCtrl'
                })
				.when('/cinema/:name', {
                    templateUrl: 'cinema-view.html',
                    controller: 'cinemaViewCtrl'
                })
				.when('/article/:name', {
                    templateUrl: 'article-view.html',
                    controller: 'articleViewCtrl'
                })
                .when('/celebrity', {
                    templateUrl: 'celebrity.html',
                    controller: 'celebrityCtrl'
                })
                .when('/report', {
                    templateUrl: 'report.html',
                    controller: 'reportCtrl'
                })
				.otherwise({
					redirectTo:'/'
				});
        });
})();

