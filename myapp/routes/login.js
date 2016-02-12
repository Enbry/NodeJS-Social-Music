var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
 if (req.accepts('text/html')) {
 res.render('login');
 }
 else {
 res.send(406, {err: 'Not valid type for asked ressource'});
 }
});

router.post('/',
 passport.authenticate('local', {
 successRedirect: '/songs',
 failureRedirect: '/login'
 })
);

module.exports = router;
