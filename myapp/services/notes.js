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
    // je vois pas l'intéret de faire ça, on ne renvoie pas l'objet Dao, on peut juste exposer quelques méthodes
    // si c'est pour faire ça, autant appeler database/notes directement dans les routes
}
