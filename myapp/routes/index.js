var express = require('express');
var router = express.Router();
var SongService = require('../services/songs');
var UsersService = require('../services/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        SongService.getTop5()
            .then(function(songs) {
                UsersService.lastUsers()
                    .then(function(users) {
                        if (req.accepts('text/html')) {
                            return res.render('home', {top5: songs, lastUser: users});
                        }
                        if (req.accepts('application/json')) {
                            res.status(200).send({top5: songs, lastUser: users});
                        }
                    })
                ;
            })
        ;
        /**
         * La logique est ok, t'aurais pu parallelisser les deux requetes, vu qu'elles ne sont pas dependantes comme ça
         return Promise.join(SongService.getTop5(),  UsersService.lastUsers(),
            function(songs, users) {
                if (req.accepts('text/html')) {
                    return res.render('home', {top5: songs, newestUser: users});
                }
                if (req.accepts('application/json')) {
                    res.status(200).send({top5: songs, newestUser: users});
                }
            })
         ;
         **/
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});

module.exports = router;
