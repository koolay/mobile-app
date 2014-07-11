'use strict';

module.exports = ['$cacheFactory',
    function ($cacheFactory) {
        return $cacheFactory('cache');
    }
];
