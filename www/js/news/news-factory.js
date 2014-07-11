'use strict';

module.exports = ['RequestFactory', '$q', 'Cache',
    function (RequestFactory) {
        var news = [];

        return {
            skip: 0,
            limit: 20,
            totalCount: 0,
            getNews: function(options) {
                var newsInstance = RequestFactory.all('dinamo-site/news'),
                    cache = (options && options.cache) ? true : false;

                newsInstance.withHttpConfig({cache: cache});

                return newsInstance.customGET('', {limit: this.limit, skip: this.skip});
            },
            getNewsItem: function(newsId) {
                return RequestFactory.one('dinamo-site/news', newsId).withHttpConfig({cache: true}).get();
            }
        }
    }
];