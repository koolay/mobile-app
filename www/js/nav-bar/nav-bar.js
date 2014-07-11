'use strict';

angular.module('NavBar', [])
    .controller('NavBarController', ['$scope', 'NavBarFactory', '$ionicSideMenuDelegate',
        function ($scope, NavBarFactory, $ionicSideMenuDelegate) {
            $scope.toggleSideMenu = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
        }
    ])
    .factory('NavBarFactory', function () {
        return {

        };
    })
    .directive('navBar', function () {
        return {
            scope: true,
            restrict: 'E',
            template: require('./nav-bar.html'),
            controller: 'NavBarController',
            replace: true
        };
    });
