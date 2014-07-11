'use strict';

var crypto = require('crypto');

/**
 * Encrypt password
 * @param password
 * @returns {string}
 */
exports.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

/**
 * Password checking
 * @param password
 * @returns {boolean}
 */
exports.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
