'use strict';

var request = require('request'),
    async = require('async'),
    newsModel = require('../model');

exports.getNews = function(params, done) {

    var result = [],
        limit = params.limit || 50;

    async.parallel({
            dinamoNewsList: function(callback){
                request({
                    url: 'http://hcdinamo.by/api/get_category_posts/?count='+ limit +'&page=1&id=5&include=id,title,url,date,content',
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
                    newsModel.getItem({
                        args: {
                            id: post.id
                        }
                    }, function(err, data) {
                        if(!data) {
                            result.push(post);
                            return newsModel.addItem(post, next);
                        }

                        return next();
                    });

                }, function(err) {
                    return done(err, result);
                });
            }
        });


};