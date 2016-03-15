'use strict'

var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../database/users');

module.exports.songApiLocalStrategy = function() {
    return new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username })
            .select('+password')
            .exec(function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Mauvais nom d\'utilisateur' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Mauvais mot de passe' });
                }
                return done(null, user);
            });
    });
};
