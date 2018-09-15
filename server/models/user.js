var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
    unique: true,
    dropDups: true
  },
	password: {
		type: String,
		required: true
	},
	favoriteAuthors: [{type: Schema.Types.ObjectId, ref: "Author", unique: true }]
});

module.exports = mongoose.model('User', userSchema);

