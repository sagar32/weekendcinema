        //directives
        angular.module("myApp").directive('myYoutube', ['$sce', YoutubeDirective]);

        function YoutubeDirective($sce) {
            return {
                restrict: 'A',
                scope: {
                    code: '='
                },
                replace: true,
                template: '<iframe style="overflow:hidden;height:relative;width:100%;margin-top:5px;" width="100%" height=relative src="{{url}}" frameborder="0" allowfullscreen></iframe>',
                link: function(scope) {
                    scope.$watch('code', function(newVal) {
                        if (newVal) {
                            scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + newVal);
                        }
                    });
                }
            };
        }