'use strict';

require('ionic-bundle');
require('restangular');

var domready = require('domready');

require('./news/news');
require('./nav-bar/nav-bar');
require('./left-menu/left-menu');
require('./common/common');

domready(function () {
    angular.module('app', [
        'ionic',
        'restangular',
        'ui.router',
        'Common',
        'News',
        'NavBar',
        'LeftMenu'
    ])
        .config(require('./app-config'))
        .run(['$ionicPlatform', function($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
            });
        }]);

    angular.bootstrap(document, ['app']);
});