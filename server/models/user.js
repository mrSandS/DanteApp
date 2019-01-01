var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO:
// favoriteAuthors and versesEmotions elements should be unique

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
    	// unique: true,
    	dropDups: true
  	},
	password: {
		type: String,
		required: true
	},
	favoriteAuthors: [{type: Schema.Types.ObjectId, ref: "Author"}],
	versesEmotions: {
		love: [{type: Schema.Types.ObjectId, ref: "Verse"}],
		laugh: [{type: Schema.Types.ObjectId, ref: "Verse"}],
		sadness: [{type: Schema.Types.ObjectId, ref: "Verse"}],
		like: [{type: Schema.Types.ObjectId, ref: "Verse"}]
  	}
});

module.exports = mongoose.model('User', userSchema);

