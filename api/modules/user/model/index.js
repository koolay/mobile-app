'use strict';

var mongoose = require('mongoose'),
    filter = require('mongoose-filter-denormalize').filter,
    schema = require('./schema'),
    _ = require('lodash'),
    mongooseUtils = require('../../../libs/mongoose-utils');

schema.plugin(mongooseUtils);

schema.plugin(filter, {
    readFilter: {
        'public': ['username', 'firstName', 'lastName', 'title', 'primaryEmail', 'emails',
            'phones', 'zendeskUser', 'accounts', 'enabled', 'userType', 'lastLoginTime',
            'lastLoginBrowser', 'lastLoginOperatingSystem', 'isCompleted', 'deleted'],
        'search': ['username', 'firstName', 'lastName', 'title', 'primaryEmail', 'emails',
            'phones', 'zendeskUser', 'accounts', 'userType']
    }
});

_.extend(schema.methods, require('./methods'));
_.extend(schema.statics, require('./statics'));

module.exports = mongoose.model('User', schema);
