var mongoose = require('mongoose');

var verseSchema = new mongoose.Schema({
	title: String,
	text: String
})

var authorSchema = new mongoose.Schema({
	name: {
		type: String
	},
	folderName: {
		type: String
	},
	verses: [verseSchema]
});

module.exports = mongoose.model('Author', authorSchema);

