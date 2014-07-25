'use strict';

var router = require('express').Router(),
    controller = require('./controller');

router.route('/news')
    .get(function(req, res) {
        controller.getNews({
            skip: req.query.skip || 0,
            limit: req.query.limit || 10,
            sort: req.query.sort || {'date': -1},
            query: req.query.query || null,
            filter: req.query.filter || {},
            fields: req.query.fields || '_id, title'
        }, function(err, result) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(result);
        });
    });

router.route('/news/:id')
    .get(function(req, res) {
        controller.getNewsItem(req.params.id, function(err, item) {
            if (err) {
                return res.error('something went wrong');
            }

            return res.success(item);
        });
    });

module.exports = router;
