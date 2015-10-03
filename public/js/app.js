var myModule = angular.module("myApp",['ngRoute'])

.config(function($routeProvider){
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
				.when('/video', {
            templateUrl: 'video.html',
            controller: 'videoCtrl'
        })
})

.controller('homeCtrl',function($scope,$http){
   
    $scope.showNewsLinks = true;
	$scope.showLinkContent = false;
	
	$scope.isLoading =true;
	$scope.newsItems = [];
		
	var date = new Date();
	var YYYY_MM_DD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	
	$http.get('https://weekendcinemaapi.herokuapp.com/v1/events/'+YYYY_MM_DD)
    .success(function(response) 
	{
		$scope.newsItems = response ? response : [];
		$scope.isLoading =false;
	})
	.error(function(){
	
		    $scope.newsItems = [];
			$scope.isLoading =false;
    });
	

	
	$scope.showOrHideNews = function(number){
		$scope.showNewsLinks = !$scope.showNewsLinks;
        $scope.showLinkContent = !$scope.showLinkContent;
        $scope.activeNews = number;
	}
	
  
})

.controller('cinemaCtrl',function($scope,$http){
   
   $scope.isLoading =false;
   
   $scope.search = function(name){
	   
	 $scope.isLoading =true;  
	 $scope.cinema = null;
	 
	 $http.get('https://weekendcinemaapi.herokuapp.com/v1/cinema/'+name)
    .success(function(response) 
	{
		$scope.cinema = response ? response : name+' details not found';
		$scope.isLoading =false;
	})
	.error(function(){
	
		    $scope.cinema = name+' details not found';
			$scope.isLoading =false;
    });
   }
 	
})
.controller('celebrityCtrl',function($scope){
   
   $scope.message = 'Celebrity page Comming soon!!';
 	
})
.controller('reportCtrl',function($scope){
   
   $scope.message = 'Report page Comming soon!!';
 	
})
.controller('videoCtrl',function($scope){
   
   $scope.message = 'Videos page Comming soon!!';
 	
})

.controller("mainCtrl",function($scope){

	$scope.pageData = {
		currentDate : new Date(),
		homeTitle :'Home',
		cinemaTitle:'Cinema',
		celebrityTitle:'Celebrity',
		reportTitle:'Cinema Report',
		videoTitle:'Video',
		languageTitle :'తెలుగు',
		bgcolor : 'bg-color'+parseInt( new Date().getDate()%7),
		color : 'color'+parseInt( new Date().getDate()%7),
		showNewsLinks : true,
		showLinkContent:false,
		home:true,
		cinema:false,
		report:false,
		celebrity:false,
		video:false
	};
	$scope.languageTitle = 'తెలుగు';
	
	$scope.menuItemClick = function(selectedItem){
		$scope.pageData.home = false;
		$scope.pageData.cinema = false;
		$scope.pageData.report = false;
		$scope.pageData.celebrity = false;
		$scope.pageData.video = false;
		switch( selectedItem ){
		  case 'home': $scope.pageData.home = true;break;
		  case 'cinema': $scope.pageData.cinema = true;break;
		  case 'report': $scope.pageData.report = true;break;
		  case 'celebrity' :$scope.pageData.celebrity = true;break;
		  case 'video':$scope.pageData.video = true;break;
		}
		
	}

	$scope.changeLanguage = function(){

		if ( $scope.pageData.languageTitle!='English' ){
			
			$scope.pageData.languageTitle ='English'; 
			$scope.pageData.homeTitle = 'హోం';
			$scope.pageData.cinemaTitle ='సినిమా' ;
			$scope.pageData.reportTitle = 'సినిమా రిపోర్ట్';
			$scope.pageData.celebrityTitle = 'సెలబ్రిటీ';
			$scope.pageData.videoTitle = 'వీడియో';
		}
		else{
			
			 $scope.pageData.currentDate = new Date(),
			 $scope.pageData.homeTitle = 'Home',
			 $scope.pageData.cinemaTitle = 'Cinema',
			 $scope.pageData.celebrityTitle = 'Celebrity',
			 $scope.pageData.reportTitle = 'Cinema Report',
			 $scope.pageData.videoTitle = 'Video';
			 $scope.pageData.languageTitle = 'తెలుగు',
			 $scope.pageData.bgcolor = 'bg-color'+parseInt( new Date().getDate()%7),
			 $scope.pageDatacolor = 'color'+parseInt( new Date().getDate()%7)
		}
		
	}

});
