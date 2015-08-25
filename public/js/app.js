var myModule = angular.module("myApp",[]);


myModule.controller("homeCtrl",function($scope){

	$scope.pageData = {
		currentDate : new Date(),
		homeTitle :'Home',
		cinemaTitle:'Cinema',
		languageTitle :'తెలుగు',
		color : 'color'+parseInt( new Date().getDate()%7),
		newsTitle : 'Latest News',
		showNewsLinks : true,
		showLinkContent:false
	};
	
    $scope.showOrHideNews = function(number){

		$scope.pageData.showNewsLinks = !$scope.pageData.showNewsLinks;
        $scope.pageData.showLinkContent = !$scope.pageData.showLinkContent;
        $scope.pageData.clickedLink = number;
	}

	$scope.changeLanguage = function(){

		if ( $scope.pageData.languageTitle!='English' ) {
			$scope.pageData.languageTitle ='English'; 
			$scope.pageData.newsTitle = 'లేటెస్ట్ న్యూస్';
			$scope.pageData.homeTitle = 'హోం';
			$scope.pageData.cinemaTitle ='సినిమా' ;
		}
		else{
			 $scope.pageData =  	{
				currentDate : new Date(),
				homeTitle :'Home',
				cinemaTitle:'Cinema',
				languageTitle :'తెలుగు',
				color : 'color'+parseInt( new Date().getDate()%7),
				newsTitle : 'Latest News',
				showNewsLinks : true,
				showLinkContent:false
			};
		}
		
	}

});
