var bcrypt = require('bcrypt');
var EmailValidator = require("email-validator");
var PasswordValidator = require('password-validator');

var PasswordValidatorSchema = new PasswordValidator();
PasswordValidatorSchema
  .is().min(8)
  .has().digits()
  .has().not().spaces();

var errorHandlerWrapper = function(messages, response) {

  return new Promise(function(res, rej){
    if (messages.length) {
      rej({
        errors: true,
        messages
      });
    } else {

      res(response);
    }
  })
};

exports.userRegisterData = function(body) {

    var messages = [];
    if (!body.email) {
      messages.push("It seems that email field is empty");
    } else if (!EmailValidator.validate(body.email)) {
      messages.push("Email that you've just sent doesn't look like email, sorry");
    }
    if (!body.password) {
      messages.push("You forgot about password");
    } else if (!PasswordValidatorSchema.validate(body.password)) {
      messages.push("Password should have at least 8 symbols, have digits and should not have spaces.")
    }

    return errorHandlerWrapper(messages);
};
exports.isRegisterUserInDb = function(user) {

  var messages = [];

  if (user) {
    messages.push("Someone has already taken this email. Try another one.");
  }

  return errorHandlerWrapper(messages);
};
exports.userLoginData = function(body) {

  var messages = [];

  if (!body.email) {
    messages.push("It seems that email field is empty");
  }
  if (!body.password) {
    messages.push("You forgot about password");
  }

  return errorHandlerWrapper(messages);

};
exports.isLoginUserInDb = function(user) {

  var messages = [];

  if (!user) {
    messages.push("Sorry, we don't have a user with this email");
  }

  return errorHandlerWrapper(messages, user);
};

exports.comparePasswords = function(reqPass, dbUser) {

  return new Promise(function(res, rej) {
    bcrypt.compare(reqPass, dbUser.password, function(err, success) {
      if (err) {
        rej({
          errors: err,
          messages: ["An error occurred while the password checking"]
        });
      }
      if (!success) {
        rej({
          errors: true,
          messages: ["Password doesn't fit"]
        });
      }
      else {
        res(dbUser);
      }
    });
  });
};