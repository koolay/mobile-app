'use strict';

exports.normalizeSortParam = function (sortParam) {
    var sort = null,
        xSort = /[+-][a-z_-]+/i;

    if (sortParam && typeof sortParam === 'string' && xSort.test(sortParam)) {
        sort = '' + sortParam;
        sort = sortParam.split(',');
        sort = sort.reduce(function (fields, field) {
            var direction = field.slice(0, 1),
                fieldName = field.slice(1);

            fields[fieldName] = direction === '+' ? 1 : -1;

            return fields;
        }, {});
    }

    return sort;
};

exports.prepareSearch = function (searchValue, model, filterType) {
    if (!searchValue || typeof searchValue !== 'string') {
        return {};
    }

    var preparedSearch = {
            $or: []
        },
        modelFields = (model._getFilterKeys && model._getFilterKeys('readFilter', filterType || 'search')) || [],
        regExp = new RegExp(searchValue, 'i'),
        item;

    modelFields.forEach(function (field) {
        item = {};
        item[field] = regExp;
        preparedSearch.$or.push(item);
    });

    return preparedSearch;
};

exports.prepareFilter = function (filters, model) {
    var preparedFilter = {
            $and: []
        },
        modelFields = (model._getFilterKeys && model._getFilterKeys('readFilter', 'public')) || [];

    filters.forEach(function(filter) {
        var item;

        if (modelFields.indexOf(filter.name) !== -1) {
            item = {};
            item[filter.name] = filter.value;
            preparedFilter.$and.push(item);
        }
    });

    if (!preparedFilter.$and.length) {
        preparedFilter = {};
    }

    return preparedFilter;
};
