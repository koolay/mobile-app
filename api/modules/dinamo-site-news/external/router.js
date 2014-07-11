'use strict';

var router = require('express').Router(),
    controller = require('./controller');

router.route('/news')
    .get(function(req, res) {
        controller.getNews(function(err, result) {
            return res.success(result);
        });
    });

module.exports = router;
