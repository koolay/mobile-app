'use strict';

var mongoose = require('../../../libs/db'),
    validate = require('mongoose-validator').validate;

var schema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: true
    },
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    title: {
        type: String
    },
    primaryEmail: {
        type: String,
        required: 'User type is required',
        validate: [
            validate({message: 'Please enter valid email'}, 'isEmail')
        ]
    },
    emails: {
        type: []
    },
    phones: {
        type: []
    },
    zendeskUser: {
        type: {}
    },
    accounts: [{
        account: { type: Number, ref: 'Account' },
        userRole: {},
        isPrimary: Boolean
    }],
    enabled: {
        type: Boolean
    },
    userType: {
        type: {},
        required: 'User type is required'
    },
    lastLoginTime: {
        type: Date,
        default: Date.now
    },
    lastLoginBrowser: {
        type: String
    },
    lastLoginOperatingSystem: {
        type: String
    },
    hashedPassword: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    confirmationDetails: {
        validationDate: Date,
        code: String
    },
    preferences: {},
    isConfirmed: Boolean,
    isCompleted: Boolean,
    deleted: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
});

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

module.exports = schema;
