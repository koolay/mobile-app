'use strict';

var _ = require('lodash');

module.exports = ['$scope', 'NewsFactory', '$stateParams', 'Loading', 'LocalStorage',
    function ($scope, NewsFactory, $stateParams, Loading, LocalStorage) {

        var viewedNews = LocalStorage.getArray('viewed_news');
        $scope.title = $stateParams.title;

        Loading.show();

        if(_.indexOf(viewedNews, $stateParams.newsId) == -1) {
            LocalStorage.pushArrayEl('viewed_news', $stateParams.newsId);
        }

        NewsFactory.getNewsItem($stateParams.newsId).then(function (item) {
            $scope.newsItem = item;
            Loading.hide();
        });
    }
];
