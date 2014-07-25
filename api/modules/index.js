'use strict';
var Agenda = require('agenda'),
    config = require('../config'),
    newsController = require('./dinamo-site-news/external/controller'),
    userCred = '';

exports.init = function(app) {
    app.use('/e/dinamo-site', require('./dinamo-site-news/external/router'));
    app.use('/i/dinamo-site', require('./dinamo-site-news/internal/router'));


    if(config.mongodb.user && config.mongodb.pass) {
        userCred = config.mongodb.user +':'+ config.mongodb.pass +'@';
    }

    var agenda = new Agenda({db: { address: 'mongodb://'+ userCred + config.mongodb.host +'/' + config.mongodb.db}});

    agenda.define('get new from dinamo minsk', function(job, done) {
        newsController.getNews({}, function(err, result) {
            result && console.log('got DATA:' + result.length);
            return done(err, result);
        });
    });

    agenda.every('5 minutes', 'get new from dinamo minsk');
    agenda.start();
};
