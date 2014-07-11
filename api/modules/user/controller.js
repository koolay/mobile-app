'use strict';

var model = require('./model');

exports._cleanUserArgs = function _cleanUserArgs(args, callback) {
    var primaryUserToAccountId = null,
        userAccounts = [];

    if (args && args.accounts && Array.isArray(args.accounts)) {
        args.accounts.forEach(function(account) {
            if (account.isPrimary) {
                primaryUserToAccountId = account.account._id;
            }

            userAccounts.push({
                account: account.account._id,
                userRole: account.userRole,
                isPrimary: account.isPrimary
            });
        });
    }

    if (!args) {
        args = {};
    }

    args.accounts = userAccounts;

    return callback(null, args, primaryUserToAccountId);
};

exports.getUsers = function(params, done) {
    params = params || {};
    params.fields = model.getReadFilterKeys('public');
    params.population = 'accounts.account';

    model.getList(params, done);
};

exports.getUser = function(userId, done) {
    model.getItem({
        args: userId,
        fields: model.getReadFilterKeys('public')
    }, done);
};

exports.getUserForAuth = function(args, done) {
    model.getItem({
        args: args
    }, done);
};

exports.updateUser = function(userId, data, done) {
    model.updateItem(userId, data, done);
};

exports.deleteUser = function(userId, done) {
    model.deleteItem(userId, done);
};

exports.resetPassword = function(code, newPassword, done) {
    model.resetPassword(code, newPassword, done);
};

exports.checkConfirmationCode = function(code, done) {
    model.checkConfirmationCode(code, done);
};
