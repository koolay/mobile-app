'use strict';

module.exports = ['$scope', 'NewsFactory', '$stateParams', 'Loading',
    function ($scope, NewsFactory, $stateParams, Loading) {

        $scope.title = $stateParams.title;

        Loading.show();

        NewsFactory.getNewsItem($stateParams.newsId).then(function (item) {
            $scope.newsItem = item;
            Loading.hide();
        });
    }
];
