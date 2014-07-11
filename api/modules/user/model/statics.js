'use strict';

var ValidationError = require('../../../libs/validation-error'),
    crypto = require('crypto');

exports.updateConfirmCode = function(username, done) {
    this.getItem({
        args: { username: username}
    }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(new ValidationError('User not found'));
            }

            var hash = crypto.createHmac('sha1', Math.random() + '').digest('hex');
            user.confirmationDetails = {
                'code': hash,
                'validationDate': Date.now() + 86400
            };

            user.save(function (err, user) {
                return done(err, user);
            });
        });
};

exports.checkConfirmationCode = function (code, done) {
    this.getItem({
        args: { 'confirmationDetails.code': code }
    }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(new ValidationError('Confirmation code is invalid'));
        }

        return done(null);
    });
};

exports.resetPassword = function (code, newPassword, done) {
    this.getItem({
        args: { 'confirmationDetails.code': code }
    }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(new ValidationError('User not found'));
        }

        user.set('password', newPassword);
        user.set('confirmationDetails', null);
        user.set('isConfirmed', true);

        user.save(function (err, user) {
            done(err, user);
        });
    });
};
