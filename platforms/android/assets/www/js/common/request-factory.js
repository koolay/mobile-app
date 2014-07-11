'use strict';
var config = require('./config');

module.exports = ['Restangular',
    function (Restangular) {

        Restangular.setBaseUrl('http://'+ config.host.test +'/i/');

        Restangular.addResponseInterceptor(function(data) {
            return data.data;
        });

        return Restangular;
    }
];
