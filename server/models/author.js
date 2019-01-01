var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var verseSchema = require('./');

// var verseSchema = new mongoose.Schema({
//   title: {
//     type: String
//   },
//   text: {
//     type: String
//   },
// });
//
// var VerseModel = mongoose.model('Verse', verseSchema);

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
  birthDate: {
	  type: Number
  },
  deathDate: {
    type: Number
  },
	verses: [{type: Schema.Types.ObjectId, ref: "Verse"}]
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

authorSchema.virtual('fullName').get(function() {
  return `${this.lastName} ${this.firstName} ${this.middleName}`;
});

module.exports = mongoose.model('Author', authorSchema);

