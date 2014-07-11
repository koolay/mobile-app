'use strict';

module.exports = ['$scope', 'NewsFactory',
    function ($scope, NewsFactory) {
        $scope.news = [];

        $scope.moreDataCanBeLoaded = true;

        $scope.doRefresh = function() {
            NewsFactory.skip = 0;

            NewsFactory.getNews({cache: false}).then(
                function (result) {
                    NewsFactory.totalCount = result.count;

                    $scope.news = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.loadMore = function() {
            console.log('123');
            NewsFactory.getNews({cache: true}).then(
                function (result) {
                    NewsFactory.totalCount = NewsFactory.totalCount || result.count;
                    NewsFactory.skip += result.data.length;

                    $scope.news = $scope.news.concat(result.data);
                    $scope.moreDataCanBeLoaded = ($scope.news.length !== NewsFactory.totalCount);

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            );
        };
    }
];
