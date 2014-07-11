'use strict';

var express = require('express'),
    app = express(),
    cors = require('cors'),
    passport = require('./modules/session/controller'),
    config = require('./config'),
    logger = require('./libs/log')(module),
    modules = require('./modules'),
    connectDomain = require('connect-domain'),
    bodyParser = require('body-parser');

require('./libs/db');
app.use(require('./libs/response'));
passport.initialize(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(require('method-override')());
app.use(require('compression')());
app.use(cors());

modules.init(app);

module.exports = exports = app;

exports.start = function (done) {
    app.listen(config.server.port, function () {
        logger.info('Express server listening on port ' + config.server.port);
        done();
    });
};

exports.stop = function (done) {
    done();
};

app.use(connectDomain());
app.use(require('./middlewares/api-break-error'));
