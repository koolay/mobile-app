'use strict';
var config = require('./config');

module.exports = ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        getArray: function(key) {
            return JSON.parse($window.localStorage[key] || '[]');
        },
        pushArrayEl: function(key, value) {
            var array = JSON.parse($window.localStorage[key] || '[]');
            array.push(value);
            $window.localStorage[key] = JSON.stringify(array);
        },
        clear: function() {
            $window.localStorage.clear();
        }
    }
}];
