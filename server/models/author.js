var mongoose = require('mongoose');

var verseSchema = new mongoose.Schema({
	title: String,
	text: String,
})

var authorSchema = new mongoose.Schema({
	lastName: {
		type: String
	},
  firstName: {
	  type: String
  },
  middleName: {
	  type: String
  },
	folderName: {
		type: String
	},
  bio: {
    type: String
  },
  lifeDates: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
	verses: [verseSchema]
});

module.exports = mongoose.model('Author', authorSchema);

