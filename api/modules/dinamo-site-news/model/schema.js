'use strict';

var mongoose = require('mongoose'),
    validator = require('validator');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    modified: {
        type: Date,
        required: true
    }
});

module.exports = schema;
