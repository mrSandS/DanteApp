var EmailValidator = require("email-validator");
var PasswordValidator = require('password-validator');

var PasswordValidatorSchema = new PasswordValidator();
PasswordValidatorSchema
  .is().min(8)
  .has().digits()
  .has().not().spaces();

var dataValidation = function(body) {
  var messages = [];
  return new Promise(function(res, rej){
    if (!body.email) {
      messages.push("Email is required");
    } else if (!EmailValidator.validate(body.email)) {
      messages.push("Email has not been validated");
    }
    if (!body.password) {
      messages.push("Password is required");
    } else if (!PasswordValidatorSchema.validate(body.password)) {
      messages.push("Password should have at least 8 symbols, have digits and should not have spaces.")
    }

    if (messages.length) {
      rej({
        errors: true,
        messages
      });
    } else {
      res();
    }
  })
};

exports.register = function(body) {
  return dataValidation(body)
};