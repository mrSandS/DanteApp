var mongoose = require('mongoose');

var verseSchema = new mongoose.Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
});

module.exports = mongoose.model('Verse', verseSchema);