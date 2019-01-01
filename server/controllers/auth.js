/**
 * Created by Sergun on 13.05.2018.
 */
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var config = include('config');
var validation = require("../validation").auth;
var bcrypt = require('bcrypt');

exports.list = function (req, res) {
  req.models.User.find({}, null, {}, function (error, users) {
    if (error) return res.send(error);
    res.send(JSON.stringify(users));
  })
};

exports.register = function (req, res) {
  req.body.email = req.body.email.trim();
  validation.userRegisterData(req.body)
    .then(function () {
      return req.models.User.findOne({
        email: req.body.email
      })
    })
    .then(function (user) {
      return validation.isRegisterUserInDb(user);
    })
    .then(function () {

      req.body.password = bcrypt.hashSync(req.body.password.trim(), 12);
      req.body.favoriteAuthors = [];
      req.body.versesEmotions = {
          love: [],
          laugh: [],
          sadness: [],
          like: [],
      };
      return req.models.User.create(req.body);
    })
    .then(function (user) {
      return createToken(user);
    })
    .then(function (user) {
      res.status(201).send({
        success: true,
        data: user
      });
    })
    .catch(function (err) {
      res.send(err);
      console.log('Register process failed: ', err);
    })
};

exports.login = function (req, res, next) {
  req.body.email = req.body.email.trim();
  validation.userLoginData(req.body)
    .then(function () {
      return req.models.User.findOne({
        email: req.body.email
      })
    })
    .then(function (user) {
      return validation.isLoginUserInDb(user);
    })
    .then(function (user) {
      return validation.comparePasswords(req.body.password, user);
    })
    .then(function (user) {
      return createToken(user);
    })
    .then(function (user) {
      res.send({
        success: true,
        data: user
      });
    })
    .catch(function (err) {

      res.send(err);
      console.log('Login process failed: ', err);
    })
};
exports.sendProfile = function (req, res, next) {
  if (!req.user) {
    console.log('User is not verified');
    return
  }
  req.models.User.findOne({
    _id: req.user._id
  })
    .populate({path: "favoriteAuthors", populate: {path: "verses"}})
    .exec(function (error, user) {
      console.log("Users favs: ", user);
      var updatedUser = _.omit(user.toObject(), 'password');
      updatedUser.token = req.headers['authorization'];
      res.send({
        success: true,
        data: updatedUser
      });
    });
};
exports.setFavoriteAuthor = function (req, res, next) {
  let userUpdateQueryCommand = req.body.status
    ? "$push"
    : "$pull";
  let authorUpdateIncValue = req.body.status
    ? 1
    : -1;

  req.models.User.findOneAndUpdate(
    {_id: req.user._id},
    {[userUpdateQueryCommand]: {favoriteAuthors: req.params.id}},
    {new: true}
  )
    .populate({path: "favoriteAuthors", populate: {path: "verses"}})
    .exec(function (error, userRes) {
      if (error) return res.send(error);
      req.models.Author.findOneAndUpdate(
        {_id: req.params.id},
        {$inc: {rating: authorUpdateIncValue}},
        {new: true},
        function (error, authorRes) {
          if (error) return res.send(error);
          console.log("Find User And Modify: ", {
            userRes,
            authorRes
          });
          res.send({
            data: {
              user: userRes,
              author: authorRes
            }
          });
        }
      )
    })
};

exports.setVerseEmotion = function (req, res, next) {
  let userUpdateQueryCommand = req.body.status
    ? "$push"
    : "$pull";
  let verseUpdateIncValue = req.body.status
    ? 1
    : -1;
  const updateEmotionProp = `versesEmotions.${req.body.emotion}`;
  const updateRatingProp = `emoRating.${req.body.emotion}`;

  // req.models.User.findById(req.user._id, function (err, doc) {
  //   if (err) console.log("Error while setting liked verse");
  //   // doc.versesEmotions.likes.push(req.params.id);
  //   doc.versesEmotions.love = [];
  //   doc.favoriteAuthors = [];
  //   doc.save(function(err, res) {
  //     if (err) console.log("Error while setting liked verse");
  //     console.log("Verse Liked", res);
  //   });
  // });

  console.log("Verse Emotion: ", {status: req.body.status, emotion: req.body.emotion});

  req.models.User.findOneAndUpdate(
    {_id: req.user._id},
    {[userUpdateQueryCommand]: {[updateEmotionProp]: req.params.id}},
    {new: true},
    function (error, userRes) {
      if (error) return res.send(error);
      req.models.Verse.findOneAndUpdate(
        {_id: req.params.id},
        {$inc: {[updateRatingProp]: verseUpdateIncValue}},
        {new: true},
        function (error, verseRes) {
          if (error) return res.send(error);
          console.log("Find Verse And Modify: ", {
            userRes,
            verseRes
          });
          res.send({
            data: {
              user: userRes,
              verse: verseRes
            }
          });
        })
    })

};

var createToken = function (user) {
  return new Promise(function (res, rej) {
    var updatedNewUser = _.omit(user.toObject(), 'password');
    jwt.sign(
      updatedNewUser,
      config.secret,
      {},
      function (err, token) {
        if (err) {
          rej(err);
        }
        updatedNewUser.token = token;
        res(updatedNewUser);
      }
    );
  });
};