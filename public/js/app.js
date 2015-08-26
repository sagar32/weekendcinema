var myModule = angular.module("myApp",[]);


myModule.controller("homeCtrl",function($scope){

	$scope.pageData = {
		currentDate : new Date(),
		homeTitle :'Home',
		cinemaTitle:'Cinema',
		weekendReportTitle:'Weekend Report',
		languageTitle :'తెలుగు',
		color : 'color'+parseInt( new Date().getDate()%7),
		newsTitle : 'Latest News',
		showNewsLinks : true,
		showLinkContent:false,
		home:true,
		cinema:false,
		weekendReport:false
	};
	
	$scope.menuItemClick = function(selectedItem){
		$scope.pageData.home = false;
		$scope.pageData.cinema = false;
		$scope.pageData.weekendReport = false;
		switch( selectedItem ){
		  case 'home': $scope.pageData.home = true;break;
		  case 'cinema': $scope.pageData.cinema = true;break;
		  case 'weekendReport': $scope.pageData.weekendReport = true;break;
		}
		
	}
	
    $scope.showOrHideNews = function(number){

		$scope.pageData.showNewsLinks = !$scope.pageData.showNewsLinks;
        $scope.pageData.showLinkContent = !$scope.pageData.showLinkContent;
        $scope.pageData.clickedLink = number;
	}

	$scope.changeLanguage = function(){

		if ( $scope.pageData.languageTitle!='English' ){
			
			$scope.pageData.languageTitle ='English'; 
			$scope.pageData.homeTitle = 'హోం';
			$scope.pageData.cinemaTitle ='సినిమా' ;
			$scope.pageData.weekendReportTitle = 'వీకెండ్ రిపోర్ట్'
		}
		else{
			
			 $scope.pageData.currentDate = new Date(),
			 $scope.pageData.homeTitle = 'Home',
			 $scope.pageData.cinemaTitle = 'Cinema',
			 $scope.pageData.weekendReportTitle = 'Weekend Report',
			 $scope.pageData.languageTitle = 'తెలుగు',
			 $scope.pageData.color = 'color'+parseInt( new Date().getDate()%7)
		}
		
	}

});
