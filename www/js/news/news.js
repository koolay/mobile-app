
angular.module('News', [])
    .config(require('./news-config'))
    .factory('NewsFactory', require('./news-factory'))
    .controller('NewsController', require('./news-controller'))
    .controller('NewsItemController', require('./news-item-controller'));