var fs = require('fs');
var path = require('path');
var data = require('./data.json');
var models = include('models');

exports.insertData = function () {
  models.Author.deleteMany({}, function (err) {
    models.Verse.deleteMany({}, function (err) {
      data.forEach(function (author, authorInx) {
        const versesPromises = [];
        author.verses.forEach(function (verse, verseInx) {
          verse.text = fs.readFileSync(path.resolve(__dirname, "./verses/" + author.folderName + "/" + verse.text), 'utf8');
          var newVerse = new models.Verse(verse);
          var versePromise = new Promise(function (res, rej) {
            newVerse.save(function (err, dbVerse) {
              if (err) rej(err);
              res(dbVerse);
            })
          });
          versesPromises.push(versePromise);
          if (verseInx === (author.verses.length - 1)) {
            Promise.all(versesPromises)
              .then(function (res) {
                author.verses = res;
                var newAuthor = new models.Author(author);
                newAuthor.save(function (err, dbAuthor) {
                  if (err) return console.log(err);
                })
              });
          }
        });
      })
    });
  })
};