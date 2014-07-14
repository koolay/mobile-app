'use strict';
var config = require('./config');

module.exports = ['Restangular', '$ionicPopup', 'Loading',
    function (Restangular, $ionicPopup, Loading) {

        Restangular.setBaseUrl('http://'+ config.host.test +'/i/');

        Restangular.addFullRequestInterceptor(function(element, operation, path, url, headers, params, httpConfig) {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: 'Проблемы с интернетом',
                        content: 'Интернет выключен на вашем устройстве'
                    });
                    Loading.hide();

                    httpConfig.timeout = 1;
                }
            }

            return {
                element: element,
                headers: headers,
                params: params,
                httpConfig: httpConfig
            };
        });

        Restangular.addResponseInterceptor(function(data) {
            return data.data;
        });

        return Restangular;
    }
];
