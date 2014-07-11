'use strict';

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    UserController = require('../user/controller');

exports.initialize = function (app) {
    passport.use(new BasicStrategy(function (username, password, done) {
        return done(null, true);
    }));

    passport.serializeUser(function (user, done) {
        return done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        return done(null, user);
    });

    app.use(passport.initialize());
    app.use('/e', passport.authenticate('basic', { session: false }));
};
