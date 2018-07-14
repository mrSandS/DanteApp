/**
 * Created by Sergun on 27.05.2018.
 */
var jwt = require('jsonwebtoken');
var config = include('config');

var verification = function(req, res, next) {
  var token = req.headers['authorization'];
  // console.log('verification: ', token);
  if (!token) {
    return next();
  }
  jwt.verify(token, config.secret, function(err, user) {
    if (err) {
      console.log('Your access token is invalid.');
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = verification;