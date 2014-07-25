'use strict';
var _ = require('lodash');

module.exports = ['$scope', 'NewsFactory', '$cacheFactory', 'LocalStorage',
    function ($scope, NewsFactory, $cacheFactory, LocalStorage) {
        $scope.news = [];

        $scope.moreDataCanBeLoaded = true;

        var viewedNews = LocalStorage.getArray('viewed_news');
        console.log(viewedNews)

        //LocalStorage.clear()
        $scope.isNew = function(itemId) {
            if(_.indexOf(viewedNews, itemId) == -1) {
                console.log(itemId)
                return true;
            }

            return false;
        };

        $scope.doRefresh = function() {
            NewsFactory.skip = 0;
            $scope.moreDataCanBeLoaded = true;
            $cacheFactory.get('$http').removeAll();

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
