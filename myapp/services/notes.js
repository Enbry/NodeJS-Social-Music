'use strict'
var Promise = require('bluebird');
var Notes = Promise.promisifyAll(require('../database/notes'));

exports.findOneByQuery = function(query) {
    return Notes.findOneAsync(query);
};

exports.create = function(notes) {
    return Notes.createAsync(notes);
};

exports.notes = function() {
    return Notes;
}
