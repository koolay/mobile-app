'use strict';

var router = require('express').Router(),
    controller = require('./controller');

router.route('/news')
    .get(function(req, res) {
        var limit = req.query.limit;

        controller.getNews({limit: limit}, function(err, result) {
            return res.success(result);
        });
    });

module.exports = router;
