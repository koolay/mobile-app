'use strict';

module.exports = ['$scope', 'NewsFactory', 'Loading',
    function ($scope, NewsFactory, Loading) {
        $scope.news = [];

        $scope.moreDataCanBeLoaded = true;

        $scope.$broadcast('scroll.infiniteScrollComplete');

        $scope.doRefresh = function() {
            NewsFactory.skip = 0;
            $scope.moreDataCanBeLoaded = true;

            NewsFactory.getNews({cache: false}).then(
                function (result) {
                    NewsFactory.totalCount = result.count;

                    $scope.news = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                },
                function(err) {
                    if(err.config.timeout) {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                }
            );
        };

        $scope.loadMore = function() {
            NewsFactory.skip = $scope.news.length;

            NewsFactory.getNews({cache: true}).then(
                function (result) {

                    NewsFactory.totalCount = NewsFactory.totalCount || result.count;

                    $scope.news = $scope.news.concat(result.data);
                    $scope.moreDataCanBeLoaded = ($scope.news.length !== NewsFactory.totalCount);

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function(err) {
                    if(err.config.timeout) {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                }
            );
        };
    }
];
