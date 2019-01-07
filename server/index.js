var setGlobals = require('./globals').setGlobals();
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var models = require('./models');
var Verse = models.Verse;
var Author = models.Author;
var User = models.User;
var middleware = require('./middleware');
var controllers = require('./controllers');
var connectUri = 'mongodb://mr_SandS:8tQfJWFiTGtBzaQT@poetcluster-shard-00-00-kwyn7.gcp.mongodb.net:27017,poetcluster-shard-00-01-kwyn7.gcp.mongodb.net:27017,poetcluster-shard-00-02-kwyn7.gcp.mongodb.net:27017/verses?ssl=true&replicaSet=PoetCluster-shard-0&authSource=admin&retryWrites=true';
// var db = mongoose.connect('mongodb://localhost/verses');
var db = mongoose.connect(connectUri);
var app = express();
// var insertData = require('./db/script').insertData;

app.use(bodyParser.json());
app.use(function(req, res, next) {
	if (!models.Author) {
		return next(new Error('No models'));
	}
	req.models = models;
	return next();
});
app.use(middleware.verification);
app.set('port', process.env.PORT || 3000);

app.get('/api/authors', controllers.authors.list);
app.get('/api/authors/:id/avatar', controllers.authors.sendAvatar);

app.get('/api/auth/users', controllers.auth.list);
app.post('/api/auth/register', controllers.auth.register);
app.post('/api/auth/login', controllers.auth.login);
app.get('/api/auth/profile', controllers.auth.sendProfile);
app.put('/api/auth/setFavoriteAuthor/:id', controllers.auth.setFavoriteAuthor);
app.put('/api/auth/setVerseEmotion/:id', controllers.auth.setVerseEmotion);

var server = http.createServer(app);

insertData();

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = server;





































// var express = require('express'),
// 	http = require('http'),
// 	path = require('path'),
// 	mongoskin = require('mongoskin'),	

// 	dbHost = '127.0.0.1',
// 	dbPort = 28017,

// 	db = mongoskin.db("mongodb://127.0.0.1:28017/verses", {native_parser:true});

// 	var collections = {
// 		authors: db.collection('authors')
// 	},
// 	/*
// 	* Routes
// 	*/
// 	authors = require('./routes/authors'),

// 	app = express();

// app.use(function(req, res, next) {
// 	req.collections = collections;
// 	return next();
// })

// /*
// * App Settings
// */

// app.set('port', 28017);

// /*
// * REST API ROUTES
// */

// app.get('/authors', authors.list);

// /*
// * Create Server
// */

// http.createServer(app).listen(app.get('port'), function(){
// 	console.log('Server is listening on port ' + app.get('port'))
// })