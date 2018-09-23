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
	favoriteAuthors: [{type: Schema.Types.ObjectId, ref: "Author", unique: true }],
	versesEmotions: {
	  love: [{type: Schema.Types.ObjectId, ref: "Verse", unique: true }],
    laugh: [{type: Schema.Types.ObjectId, ref: "Verse", unique: true }],
    sadness: [{type: Schema.Types.ObjectId, ref: "Verse", unique: true }],
    like: [{type: Schema.Types.ObjectId, ref: "Verse", unique: true }]
  }
});

module.exports = mongoose.model('User', userSchema);

