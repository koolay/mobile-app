'use strict';

var mongoose = require('mongoose'),
    logger = require('./log')(module),
    config = require('../config');

if (config.mongodb.debug) {
    mongoose.set('debug', function (collectionName, method, query, doc) {
        logger.info(collectionName, method, query, doc);
    });
}

//mongodb://nodejitsu:7f78e5d74016c76f1e6b0e62ed83cec1@troup.mongohq.com:10070/nodejitsudb8881598792
mongoose.connect('mongodb://'+ config.mongodb.user +':'+ config.mongodb.pass +'@'+ config.mongodb.host +'/' + config.mongodb.db, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});

module.exports = mongoose;
