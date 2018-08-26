var fs = require('fs');
var path = require('path');
var data = require('./data.json');
var models = include('models');

exports.insertData = function() {
  models.Author.deleteMany({}, function(res) {
    data.forEach(function(author) {
    	author.verses.forEach(function(verse) {
    		console.log(path.resolve(__dirname, verse.text));
        console.log("Path: ", "./verses/" + author.folderName + "/" + verse.text);
        verse.text = fs.readFileSync(path.resolve(__dirname, "./verses/" + author.folderName + "/" + verse.text), 'utf8');
    	});
    	var newAuthor = new models.Author(author);
    	newAuthor.save(function (err) {
    	  if (err) return handleError(err);
    	  // saved!
    	})
    })
	});
};
 