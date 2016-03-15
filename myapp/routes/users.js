var express = require('express');
var router = express.Router();
var UsersService = require('../services/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        var keys = ["username", "displayName"];
        var params = {};
        keys.forEach(function(key) {
            if (req.query[key]) {
                params[key] = req.query[key];
            }
        })
        UsersService.find(params)
            .then(function(users) {
                if (req.accepts('text/html')) {
                    return res.render('users', {users: users});
                }
                if (req.accepts('application/json')) {
                    res.status(200).send(users);
                }
            })
        ;
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});

router.get('/me', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        if (req.accepts('text/html')) {
            res.render('user', {account: req.user});
            return;
        }

        if (req.accepts('application/json')) {
            res.status(200).send(req.user);
            return;
        }
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});

router.get('/:id', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        UsersService.findOneByQuery({_id: req.params.id})
            .then(function(user) {
                if (!user) {
                    res.status(404).send({err: 'No user found with id' + req.params.id});
                    return;
                }
                if (req.accepts('text/html')) {
                    res.render('user', {account: user});
                    return;
                }
                if (req.accepts('application/json')) {
                    res.status(200).send(user);
                    return;
                }
            })
            .catch(function(err) {
            })
        ;
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});

module.exports = router;
