/**
 * Created by Sergun on 13.05.2018.
 */
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var config = include('config');
var validation = require("../validation").auth;

exports.list = function (req, res) {
  req.models.User.find({}, null, {}, function(error, users) {
    if (error) return res.send(error);
    res.send(JSON.stringify(users));
  })
};

exports.register = function(req, res) {
  validation.register(req.body)
    .then(function() {
      req.body.password = bcrypt.hashSync(req.body.password.trim(), 12);
      return req.models.User.create(req.body);
    })
    .then(function (user) {
      return createToken(user);
    })
    .then(function(user) {
      res.status(201).send({
        success: true,
        data: user
      });
    })
    .catch(function(err) {
      res.send(err);
      // console.log('Register process failed: ', err);
    })
};

exports.login = function(req, res, next) {
  // console.log('LOGIN');
  // if (!req.body.email || !req.body.password) {
  //   console.log('You must send the username and the password.');
  //   return
  // }
  req.models.User.findOne({
    email: req.body.email
  })
    .then(function(user) {
      // if (user.length == 0) {
      //   return Promise.reject(res, 'The email has not been found.');
      // }
      return comparePasswords(req.body.password, user);
    })
    .then(function (user) {
      return createToken(user);
    })
    .then(function(user) {
      res.status(201).send({
        success: true,
        data: user
      });
    })
    .catch(function(err) {
      res.send(err);
      console.log('Login process failed: ', err);
    })
};
exports.sendProfile = function(req, res, next) {
  if (!req.user) {
    console.log('User is not verified');
    return
  }
  req.models.User.findOne({
    _id: req.user._id
  })
    .then(function (user) {
      var updatedUser = _.omit(user.toObject(), 'password');
      updatedUser.token = req.headers['authorization'];
      res.send({
        success: true,
        data: updatedUser
      });
    });
};
// req.body.password, user.password
var comparePasswords = function(reqPass, dbUser) {
  return new Promise(function(res, rej) {
    bcrypt.compare(reqPass, dbUser.password, function(err, success) {
      if (err) {
        rej('An error occurred while the password checking: ', err);
      }
      if (!success) {
        rej('Your password is incorrect: ', err);
      } else {
        res(dbUser);
      }
    });
  });
};
var createToken = function(user) {
  return new Promise(function(res, rej) {
    var updatedNewUser = _.omit(user.toObject(), 'password');
    jwt.sign(
      updatedNewUser,
      config.secret,
      {},
      function(err, token) {
        if (err) {
          rej(err);
        }
        updatedNewUser.token = token;
        res(updatedNewUser);
      }
    );
  });
};