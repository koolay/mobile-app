'use strict';
var config = require('./config');

module.exports = ['$ionicLoading',
    function ($ionicLoading) {
        return {
            show: function(options) {
                options = options || {
                    animation: 'fade-in',
                    showBackdrop: false,
                    template: '<i class="icon ion-refreshing"></i>'
                };

                $ionicLoading.show(options);
            },
            hide: function() {
                $ionicLoading.hide();
            }
        };
    }
];
