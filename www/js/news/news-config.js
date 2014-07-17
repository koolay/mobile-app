'use strict';

module.exports = ['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('news', {
                url: '/news',
                template: require('./views/news-list.html'),
                controller: 'NewsController'
            })
            .state('news-details', {
                url: '/news/:newsId',
                template: require('./views/news-item.html'),
                controller: 'NewsItemController'
            });
    }
];