'use strict';

angular.module('Common', [])
    .factory('RequestFactory', require('./request-factory'))
    .factory('Loading', require('./loading'))
    .directive('compile', require('./directives/compile'))
    .directive('a', require('./directives/a'));
