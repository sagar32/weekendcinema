        //controllers
        angular.module("myApp").controller('mainCtrl', ['$scope', MainCtrl]);
        angular.module("myApp").controller('homeCtrl', ['$scope', '$http', HomeCtrl]);
        angular.module("myApp").controller('cinemaViewCtrl', ['$scope', '$http', '$routeParams', CinemaViewCtrl]);
        angular.module("myApp").controller('celebrityCtrl', ['$scope', CelebrityCtrl]);
        angular.module("myApp").controller('reportCtrl', ['$scope', ReportCtrl]);
        angular.module("myApp").controller('articleViewCtrl', ['$scope','$http','$routeParams', ArticleViewCtrl]);


        function CinemaViewCtrl($scope, $http, $routeParams) {
        	$scope.cinemaName = $routeParams.name;
        	$scope.isLoading = true;
        	$scope.found = true;
        	$scope.cinemaList = ['Srimanthudu', 'Garam'];
        	$scope.myInterval = 5000;

        	$scope.search = function(name) {
        		if ($scope.cinemaList.indexOf(name) == -1)
        			window.location.href = "#/cinema";
        		else
        			window.location.href = "#/cinema/" + name;
        	}

        	$scope.change = function() {
        		$scope.found = true;
        	}
        	$http.get('https://weekendcinemaapi.herokuapp.com/v1/cinema/' + $routeParams.name)
        		.success(function(response) {
        			$scope.cinema = response || null;
        			$scope.isLoading = false;
        		})
        		.error(function() {
        			$scope.cinema = null;
        			$scope.isLoading = false;
        		});
        }



        function ArticleViewCtrl($scope,$http,$routeParams) {
    $scope.found = true;
	$scope.article =null;
		  
		  
$http({
  method: 'GET',
  url: 'https://weekendcinemaapi.herokuapp.com/v1/event/'+$routeParams.name
}).then(function successCallback(response) {
   $scope.article = response ? response.data : null;
   $scope.found = true;
  }, function errorCallback(response) {
    
    $scope.article =  null;
	 $scope.found = false;
	
  });
// $scope.found = $scope.article ||false;
			
        }


        function HomeCtrl($scope, $http) {
        	$scope.newsItems = [];

        	var date = new Date();
        	var YYYY_MM_DD = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        	$scope.isLoading = true;

        	$http.get('https://weekendcinemaapi.herokuapp.com/v1/events/')
        		.success(function(response) {
        			$scope.newsItems = response ? response : [];
        			$scope.isLoading = false;
        			$scope.totalItems = $scope.newsItems.length;
        		})
        		.error(function() {
        			$scope.newsItems = [];
        			$scope.isLoading = false;
        		});


        	$scope.showArticle = function(article) {
        		window.location.href = "#/article/" + article._id;
        	}

        }

        function CelebrityCtrl($scope) {

        	$scope.message = 'Celebrity page coming soon!!';

        }

        function ReportCtrl($scope) {

        	$scope.message = 'Report page coming soon!!';

        }

        function MainCtrl($scope) {
        	$scope.cinemaList = [{'name':'Srimanthudu','id':'srimanthudu','type':'c'},{'name':'Garam','id':'garam','type':'c'}];
        	$scope.search = function(name) {
        			window.location.href = "#/cinema/" + name;
        	}

        }