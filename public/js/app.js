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

.controller('homeCtrl',function($scope){
   
  $scope.showNewsLinks = true;
	$scope.showLinkContent = false;
    
	$scope.news = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
	$scope.nitems = 12;
	$scope.cnews = [];
	for ( var i =0 ;i< $scope.nitems ;i++ ){
	
	   $scope.cnews.push($scope.news[i]);
	}
	console.log(  $scope.cnews);
	$scope.rNewsItems = $scope.news.length-$scope.nitems ;
	$scope.rNewsItems > 0 ? $scope.next = '': $scope.next = 'disabled';
	$scope.lNewsItems = 0;
	$scope.lNewsItems > 0 ? $scope.previous = '': $scope.previous = 'disabled';
	
	$scope.showNewsItems = $scope.news.length >0 ? true: false;

	$scope.nextButtonClick = function(){
		
	
		$scope.lNewsItems = $scope.lNewsItems +$scope.nitems;
		$scope.rNewsItems = $scope.rNewsItems-$scope.nitems;
		console.log('r items ..'+$scope.rNewsItems);
		$scope.rNewsItems > 0 ? $scope.next = '': $scope.next = 'disabled';
		$scope.lNewsItems > 0 ? $scope.previous = '': $scope.previous = 'disabled';
		
			$scope.cnews = [];

			if ( $scope.news.length-$scope.lNewsItems >=$scope.nitems  ){
				
				for ( var i =0 ;i < $scope.nitems ;i++ ){
	
				$scope.cnews.push($scope.news[i+$scope.lNewsItems]);
			   }
			}
			else{
				var items = $scope.news.length-$scope.lNewsItems;
				for ( var i =0 ;i < items ;i++ ){
				$scope.cnews.push($scope.news[i+$scope.lNewsItems]);
			   }
			}
			
	}
	
		$scope.previousButtonClick = function(){
			
		$scope.lNewsItems = $scope.lNewsItems-$scope.nitems;
		$scope.rNewsItems = $scope.rNewsItems+$scope.nitems;
		$scope.rNewsItems > 0 ? $scope.next = '': $scope.next = 'disabled';
		$scope.lNewsItems > 0 ? $scope.previous = '': $scope.previous = 'disabled';
		console.log('r items ..'+$scope.rNewsItems);
		$scope.cnews = [];

				for ( var i =0 ;i < $scope.nitems ;i++ ){
	
				$scope.cnews.push($scope.news[i+$scope.lNewsItems]);
			   }
		
	}
	
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
	 
	 $http.get('https://weekendcinemaapi.herokuapp.com/getData/cinema/'+name)
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
