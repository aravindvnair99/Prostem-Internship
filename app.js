var express = require("express");
var session = require('express-session');

var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user')
var post = require('./post')

var app = express();

app.use(session({ secret: 'my-secret', resave: true, saveUninitialized: true }));
var sessions;


app.use(express.static(path.join(__dirname, "/html")));

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/html/index.html');
})

app.get('/home', function (req, res) {
	if (sessions && sessions.username) {
		res.sendFile(__dirname + '/html/home.html');
	}
	else {
		res.send('Unauthorized access');
	}
})

app.post('/signin', function (req, res) {
	sessions = req.session;
	var user_name = req.body.email;
	var password = req.body.password;
	user.validateSignIn(user_name, password, function (result) {
		if (result) {
			sessions.username = user_name;
			res.send('success');
		}
	});
})

app.post('/logout', function (req, res) {
	req.session.username = '';
	res.send('Logged out successfully');
})

app.post('/signup', function (req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var gender = req.body.gender;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;

	if (firstname && lastname && gender && email && mobile && password) {
		user.signup(firstname, lastname, gender, email, mobile, password)
	}
	else {
		res.send('Failure');
	}
})

app.post('/addpost', function (req, res) {
	var title = req.body.title;
	var subject = req.body.subject;
	var id = req.body.id;
	console.log('id is ', id);
	if (id == '' || id == undefined) {
		console.log('add');
		post.addPost(title, subject, function (result) {
			res.send(result);
		});
	}
	else {
		console.log('update', title, subject);
		post.updatePost(id, title, subject, function (result) {
			res.send(result);
		});
	}

})

app.post('/updateProfile', function (req, res) {
	var name = req.body.name;
	var password = req.body.password;

	user.updateProfile(name, password, sessions.username, function (result) {
		res.send(result);
	})
})

app.post('/getpost', function (req, res) {
	post.getPost(function (result) {
		res.send(result);
	});
})

app.post('/deletePost', function (req, res) {
	var id = req.body.id;
	post.deletePost(id, function (result) {
		res.send(result)
	})
})

app.post('/getProfile', function (req, res) {
	user.getUserInfo(sessions.username, function (result) {
		res.send(result)
	})
})

app.post('/getPostWithId', function (req, res) {
	var id = req.body.id;
	post.getPostWithId(id, function (result) {
		res.send(result)
	})
})


app.listen(7777, function () {
	console.log("Started listening on port", 7777);
})
