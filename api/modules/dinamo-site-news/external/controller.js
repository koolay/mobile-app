'use strict';

var request = require('request'),
    async = require('async'),
    newsModel = require('../model');

exports.getNews = function(done) {
    request({
        url: 'http://testing.hcdinamo.by/api/get_category_posts/?count=50&page=1&id=5&include=id,title,content,url,modified',
        method: 'GET',
        jar: false,
        pool: false,
        json: true
    }, function(err, response, body) {
        if(err) {
            return done(err);
        }

        if(body.status === 'ok') {
            async.each(body.posts, function(post, next) {
                newsModel.addItem(post, next);
            }, function(result) {
                return done(null, result);
            });
        }
    });
};