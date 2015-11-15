(function() {
        'use strict'
        //module
        angular.module("myApp", ['ngRoute']);
        //controllers
        angular.module("myApp").controller('homeCtrl', ['$scope', '$http', HomeCtrl]);
        angular.module("myApp").controller('cinemaCtrl', ['$scope', '$http', CinemaCtrl]);
        angular.module("myApp").controller('celebrityCtrl', ['$scope', CelebrityCtrl]);
        angular.module("myApp").controller('reportCtrl', ['$scope', ReportCtrl]);
        angular.module("myApp").controller('mainCtrl', ['$scope', MainCtrl]);

        //directives
        angular.module("myApp").directive('myYoutube', ['$sce', YoutubeDirective]);

        angular.module("myApp").config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'default.html',
                    controller: 'homeCtrl'
                })
                .when('/cinema', {
                    templateUrl: 'cinema.html',
                    controller: 'cinemaCtrl'
                })
                .when('/celebrity', {
                    templateUrl: 'celebrity.html',
                    controller: 'celebrityCtrl'
                })
                .when('/report', {
                    templateUrl: 'report.html',
                    controller: 'reportCtrl'
                })
        })

        function YoutubeDirective($sce) {
            return {
                restrict: 'A',
                scope: {
                    code: '='
                },
                replace: true,
                template: '<iframe style="overflow:hidden;height:relative;width:100%" width="100%" height=relative src="{{url}}" frameborder="0" allowfullscreen></iframe>',
                link: function(scope) {
                    scope.$watch('code', function(newVal) {
                        if (newVal) {
                            scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + newVal);
                        }
                    });
                }
            };
        }


        function MainCtrl($scope) {

            $scope.d = {
                currentDate: new Date(),
                homeTitle: 'Home',
                cinemaTitle: 'Cinema',
                celebrityTitle: 'Celebrity',
                reportTitle: 'Cinema Report',
                videoTitle: 'Video',
                languageTitle: 'తెలుగు',
                bgcolor: 'bg-color' + parseInt(new Date().getDate() % 7),
                color: 'color' + parseInt(new Date().getDate() % 7),
                showNewsLinks: true,
                showLinkContent: false,
                home: true,
                cinema: false,
                report: false,
                celebrity: false,
                video: false
            };
            $scope.languageTitle = 'తెలుగు';

            $scope.menuItemClick = function(selectedItem) {
                $scope.d.home = false;
                $scope.d.cinema = false;
                $scope.d.report = false;
                $scope.d.celebrity = false;
                $scope.d.video = false;
                switch (selectedItem) {
                    case 'home':
                        $scope.d.home = true;
                        break;
                    case 'cinema':
                        $scope.d.cinema = true;
                        break;
                    case 'report':
                        $scope.d.report = true;
                        break;
                    case 'celebrity':
                        $scope.d.celebrity = true;
                        break;
                    case 'video':
                        $scope.d.video = true;
                        break;
                }

            }

            $scope.changeLanguage = function() {

                if ($scope.d.languageTitle != 'English') {

                    $scope.d.languageTitle = 'English';
                    $scope.d.homeTitle = 'హోం';
                    $scope.d.cinemaTitle = 'సినిమా';
                    $scope.d.reportTitle = 'సినిమా రిపోర్ట్';
                    $scope.d.celebrityTitle = 'సెలబ్రిటీ';
                    $scope.d.videoTitle = 'వీడియో';
                } else {

                    $scope.d.currentDate = new Date(),
                        $scope.d.homeTitle = 'Home',
                        $scope.d.cinemaTitle = 'Cinema',
                        $scope.d.celebrityTitle = 'Celebrity',
                        $scope.d.reportTitle = 'Cinema Report',
                        $scope.d.videoTitle = 'Video';
                    $scope.d.languageTitle = 'తెలుగు',
                        $scope.d.bgcolor = 'bg-color' + parseInt(new Date().getDate() % 7),
                        $scope.d.color = 'color' + parseInt(new Date().getDate() % 7)
                }

            }

        }

        function HomeCtrl($scope, $http) {

            $scope.showNewsLinks = true;
            $scope.showLinkContent = false;
            $scope.isLoading = true;
            $scope.newsItems = [];

            var date = new Date();
            var YYYY_MM_DD = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

            $http.get('https://weekendcinemaapi.herokuapp.com/v1/events/')
                .success(function(response) {
                    $scope.newsItems = response ? response : [];
                    $scope.isLoading = false;
                })
                .error(function() {

                    $scope.newsItems = [];
                    $scope.isLoading = false;
                });



            $scope.showOrHideNews = function(number) {
                $scope.showNewsLinks = !$scope.showNewsLinks;
                $scope.showLinkContent = !$scope.showLinkContent;
                $scope.activeNews = number;
            }

        }

        function CinemaCtrl($scope, $http){
			
        $scope.isLoading = false;
        $scope.cinema = false;
		$scope.found = false;
        $scope.search = function(name) {
            $scope.isLoading = true;
			$scope.found = false;
			$scope.cinema = null;
            $http.get('https://weekendcinemaapi.herokuapp.com/v1/cinema/' + name)
                .success(function(response) {
                    $scope.cinema = response || null;
                    $scope.isLoading = false;
					$scope.found = response == null ? true:false;
                })
                .error(function() {
                    $scope.cinema = null;
                    $scope.isLoading = false;
					$scope.found = true; 
                });
        }
		$scope.change = function(){
			$scope.found = false 
		}

    }

    function CelebrityCtrl($scope) {

        $scope.message = 'Celebrity page Comming soon!!';

    }

    function ReportCtrl($scope) {

        $scope.message = 'Report page Comming soon!!';

    }

})();