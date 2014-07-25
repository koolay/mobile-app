'use strict';

angular.module('Common', [])
    .factory('RequestFactory', require('./request-factory'))
    .factory('Loading', require('./loading'))
    .factory('LocalStorage', require('./localStorage'))
    .directive('compile', require('./directives/compile'))
    .directive('a', require('./directives/a'));
