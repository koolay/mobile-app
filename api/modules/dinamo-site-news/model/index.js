'use strict';

var mongoose = require('mongoose'),
    schema = require('./schema'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

module.exports = mongoose.model('New', schema);
