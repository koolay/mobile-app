'use strict';

var request = require('request'),
    async = require('async'),
    newsModel = require('../model'),
    _ = require('lodash');

exports.getNews = function(done) {

    var result = [],
        limit = 50,
        compare;

    async.parallel({
            newsList: function(callback){
                newsModel.getList({
                    skip: 0,
                    limit: limit,
                    fields: 'id'
                }, callback);
            },
            dinamoNewsList: function(callback){
                request({
                    url: 'http://hcdinamo.by/api/get_category_posts/?count='+ limit +'&page=1&id=5&include=id,title,url,modified,content',
                    method: 'GET',
                    jar: false,
                    pool: false,
                    json: true
                }, function(err, response, body) {
                    return callback(err, body);
                });
            }
        },
        function(err, results){
            if(err) {
                return done(err);
            }

            if(results.dinamoNewsList.status === 'ok') {
                async.eachSeries(results.dinamoNewsList.posts, function(post, next) {

                    compare = _.find(results.newsList.data, { 'id': post.id });
                    if(!compare) {
                        result.push(post);
                        return newsModel.addItem(post, next);
                    }

                    return next();

                }, function(err) {
                    return done(err, result);
                });
            }
        });


};