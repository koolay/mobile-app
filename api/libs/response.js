'use strict';

var response = function response(status, data, message) {
    return {
        status: +status,
        data: data || null,
        message: message || null
    };
};

module.exports = function(req, res, next) {
    res.success = function(data) {
        return res.send(response(200, data));
    };

    res.badRequest = function(message, data) {
        return res.send(response(400, data, message));
    };

    res.unauthorized = function(message, data) {
        return res.send(response(401, data, message));
    };

    res.forbidden = function(message, data) {
        return res.send(response(403, data, message));
    };

    res.conflict = function(err, message, data) {
        data = data || {};
        data.messages = [];
        err = err || {};

        // handle errors to messages
        Object.keys(err.errors || {}).forEach(function(error) {
            data.messages.push(err.errors[error].message);
        });
        return res.send(response(409, data, message));
    };

    res.error = function(error, message) {
        //--------------------------------
        // TODO: logger.log(error);
        //--------------------------------
        return res.send(response(500, null, message));
    };

    next();
};
