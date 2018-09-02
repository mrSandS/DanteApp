var fs = require('fs');
var path = require('path');

exports.list = function(req, res, next) {
	req.models.Author.find({}, null, {}, function(error, authors) {
		if (error) return res.send(error);
		// console.log('List Authors: ', authors);
		res.send(JSON.stringify(authors));
	})	
};
exports.sendAvatar = function(req, res, next) {
	// console.log(req.params);
	var authorId = req.params.id;
	req.models.Author.findOne({_id: authorId}, null, function(error, author) {
		if (error) return res.send(error);

		console.log(author.folderName);
		var relativePath = '../db/images/' + author.folderName + '/avatar.jpg';
    if(path.resolve(__dirname, relativePath)) {
      var avatar = fs.readFileSync(path.resolve(__dirname, relativePath));
      res.writeHead(200, {"Content-Type": "image/jpg"});
      res.end(avatar, "binary");
		}
	})
};
exports.setFavoriteStatus = function(req, res, next) {
  var authorId = req.params.id;
  req.models.Author.updateOne({_id: authorId}, {isFavorite: req.body.status}, null, function(error, response) {
    if (error) return res.send(error);

    res.send(response);
    console.log("Updating author: ", response);

  });
	console.log(req.body);
};