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
		
	$scope.youtube_prefix = 'https://www.youtube.com/embed/ZqogpfAqlp8';
	
	var date = new Date();
	var YYYY_MM_DD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	
	$http.get('https://weekendcinemaapi.herokuapp.com/v1/events/')
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
    
	$scope.d = {
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
		$scope.d.home = false;
		$scope.d.cinema = false;
		$scope.d.report = false;
		$scope.d.celebrity = false;
		$scope.d.video = false;
		switch( selectedItem ){
		  case 'home': $scope.d.home = true;break;
		  case 'cinema': $scope.d.cinema = true;break;
		  case 'report': $scope.d.report = true;break;
		  case 'celebrity' :$scope.d.celebrity = true;break;
		  case 'video':$scope.d.video = true;break;
		}
		
	}

	$scope.changeLanguage = function(){

		if ( $scope.d.languageTitle!='English' ){
			
			$scope.d.languageTitle ='English'; 
			$scope.d.homeTitle = 'హోం';
			$scope.d.cinemaTitle ='సినిమా' ;
			$scope.d.reportTitle = 'సినిమా రిపోర్ట్';
			$scope.d.celebrityTitle = 'సెలబ్రిటీ';
			$scope.d.videoTitle = 'వీడియో';
		}
		else{
			
			 $scope.d.currentDate = new Date(),
			 $scope.d.homeTitle = 'Home',
			 $scope.d.cinemaTitle = 'Cinema',
			 $scope.d.celebrityTitle = 'Celebrity',
			 $scope.d.reportTitle = 'Cinema Report',
			 $scope.d.videoTitle = 'Video';
			 $scope.d.languageTitle = 'తెలుగు',
			 $scope.d.bgcolor = 'bg-color'+parseInt( new Date().getDate()%7),
			 $scope.d.color = 'color'+parseInt( new Date().getDate()%7)
		}
		
	}

})
.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe style="overflow:hidden;height:relative;width:100%" width="100%" height=relative src="{{url}}" frameborder="0" allowfullscreen></iframe>',
    link: function (scope) {
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});

