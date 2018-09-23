var mongoose = require('mongoose');

var verseSchema = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
  emoRating: {
    love: {
      type: Number,
      default: 0
    },
    laugh: {
      type: Number,
      default: 0
    },
    sadness: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('Verse', verseSchema);