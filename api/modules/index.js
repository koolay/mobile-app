'use strict';

exports.init = function(app) {
    app.use('/e/dinamo-site', require('./dinamo-site-news/external/router'));
    app.use('/i/dinamo-site', require('./dinamo-site-news/internal/router'));
};
