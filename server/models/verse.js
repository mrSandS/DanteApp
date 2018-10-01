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
},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

verseSchema.virtual('emoRating.total').get(function() {
  return this.emoRating.love + this.emoRating.laugh + this.emoRating.sadness + this.emoRating.like;
});

module.exports = mongoose.model('Verse', verseSchema);