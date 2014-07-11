'use strict';

angular.module('LeftMenu', [])
    .controller('LeftMenuController', ['$scope', 'LeftMenuFactory',
        function ($scope, LeftMenuFactory) {

        }
    ])
    .factory('LeftMenuFactory', function () {
        return {
            name: { a: 'name' }
        };
    })
    .directive('leftMenu', function () {
        return {
            scope: true,
            restrict: 'E',
            template: require('./left-menu.html'),
            controller: 'LeftMenuController',
            replace: true
        };
    });
