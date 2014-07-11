'use strict';

var util = require('util');

function ValidationError(messages) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, ValidationError);
    var errors = [];

    if(typeof messages === 'string') {
        errors = [{message: messages}];
    } else if(Array.isArray(messages)) {
        messages.forEach(function(error) {
            errors.push({
                message: error
            });
        });
    }

    this.errors = errors || [{message: 'Error'}];
}

util.inherits(ValidationError, Error);

ValidationError.prototype.name = 'ValidationError';

module.exports = ValidationError;