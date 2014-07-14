'use strict';

module.exports = ['$ionicPlatform', '$q',
    function ($ionicPlatform, $q) {

        var Connection = window.Connection || {
            "CELL" : "cellular",
            "CELL_2G" : "2g",
            "CELL_3G" : "3g",
            "CELL_4G" : "4g",
            "ETHERNET" : "ethernet",
            "NONE" : "none",
            "UNKNOWN" : "unknown",
            "WIFI" : "wifi"
        };

        var asyncGetConnection = function () {
            var q = $q.defer();
            $ionicPlatform.ready(function () {
                if(navigator.connection) {
                    q.resolve(navigator.connection);
                } else {
                    q.resolve({type: Connection.ETHERNET});
                }
            });
            return q.promise;
        };

        return {
            isOnline: function () {
                return asyncGetConnection().then(function(networkConnection) {
                    var isConnected = false;

                    switch (networkConnection.type) {
                        case Connection.ETHERNET:
                        case Connection.WIFI:
                        case Connection.CELL_2G:
                        case Connection.CELL_3G:
                        case Connection.CELL_4G:
                        case Connection.CELL:
                            isConnected = true;
                            break;
                    }
                    return isConnected;
                });
            }
        };
    }
];
