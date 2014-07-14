'use strict';

angular.module('Common', [])
    .factory('RequestFactory', require('./request-factory'))
    .factory('Loading', require('./loading'))
    .factory('Cache', require('./cache'))
    .service('CordovaNetwork', require('./network'));
