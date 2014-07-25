'use strict';

var mongoose = require('mongoose'),
    validator = require('validator');

var schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: false
    },

    url: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
});

module.exports = schema;
