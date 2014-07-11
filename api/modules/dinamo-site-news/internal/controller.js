'use strict';

var model = require('../model');

exports.getNews = function(params, done) {
    params = params || {};
    model.getList(params, done);
};

exports.getNewsItem = function(args, done) {
    model.getItem(args, done);
};