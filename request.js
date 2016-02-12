var request = require('request');
var _ = require('lodash');

var options = {

 hostname: 'http://jomaora-restapi.herokuapp.com',

 path: '/reviews',

 method: 'GET',

 headers: {

 accept: 'application/json'

 }

};

request
  .get(options.hostname + options.path, function (error, response, body){
    if (!error &&response.statusCode == 200){
      console.log(body);
    }
    res = JSON.parse(body);
      console.log (_.filter(res, (res) => { return (res.stars === 5); }))
      console.log(_.filter(res.name))


});
