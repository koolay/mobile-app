'use strict';
module.exports = ['$urlRouterProvider',
    function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/news');
    }
];