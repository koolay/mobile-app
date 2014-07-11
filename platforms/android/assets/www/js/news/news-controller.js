'use strict';

module.exports = ['$scope', 'NewsFactory',
    function ($scope, NewsFactory) {
        $scope.news = [];

        $scope.moreDataCanBeLoaded = true;

        $scope.doRefresh = function() {
            NewsFactory.skip = 0;
            $scope.moreDataCanBeLoaded = true;

            NewsFactory.getNews({cache: false}).then(
                function (result) {
                    NewsFactory.totalCount = result.count;

                    $scope.news = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.loadMore = function() {

            NewsFactory.skip = $scope.news.length;

            NewsFactory.getNews({cache: true}).then(
                function (result) {
                    navigator.notification.alert(navigator.connection.type);

                    NewsFactory.totalCount = NewsFactory.totalCount || result.count;

                    $scope.news = $scope.news.concat(result.data);
                    $scope.moreDataCanBeLoaded = ($scope.news.length !== NewsFactory.totalCount);

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            );
        };
    }
];
