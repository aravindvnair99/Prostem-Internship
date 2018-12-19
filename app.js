const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const user = require('./user');
const post = require('./post');
const PORT = process.env.PORT || 5000;

var app = express();
app.use(
	session({ secret: 'my-secret', resave: true, saveUninitialized: true })
);
var sessions;
app.use(express.static(path.join(__dirname, '/views')));
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/home', function(req, res) {
	if (sessions && sessions.username) {
		res.sendFile(__dirname + '/views/home.html');
	} else {
		res.redirect('/');
	}
});

app.post('/signin', function(req, res) {
	sessions = req.session;
	var user_name = req.body.email;
	var password = req.body.password;
	user.validateSignIn(user_name, password, function(result) {
		if (result) {
			sessions.username = user_name;
			res.send('success');
		}
	});
});

app.post('/logout', function(req, res) {
	req.session.username = '';
	res.send('Logged out successfully');
});

app.post('/checkEmail', function(req, res) {
	var email = req.body.email;
	if (email) {
		user.checkEmail(email, function(result) {
			if (result) {
				res.send('success');
			}
		});
	}
});

app.post('/signup', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var gender = req.body.gender;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;
	if (firstname && lastname && gender && email && mobile && password) {
		user.signup(
			firstname,
			lastname,
			gender,
			email,
			mobile,
			password,
			function(result) {
				if (result) {
					res.send('success');
				}
			}
		);
	} else {
		res.send('Failure');
	}
});

app.post('/addpost', function(req, res) {
	var title = req.body.title;
	var subject = req.body.subject;
	var email = req.body.email;
	var category = req.body.category;
	var id = req.body.id;
	console.log('id is ', id);
	if (id == '' || id == undefined) {
		console.log('add');
		post.addPost(title, subject, category, email, function(result) {
			res.send(result);
		});
	} else {
		console.log('update', title, subject, email);
		post.updatePost(id, title, subject, category, email, function(result) {
			res.send(result);
		});
	}
});

app.post('/addcategory', function(req, res) {
	var category = req.body.category;
	post.addCategory(category, function(result) {
		res.send(result);
	});
});

app.post('/getcategory', function(req, res) {
	post.getCategory(function(result) {
		res.send(result);
	});
});

app.post('/updateProfile', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var mobile = req.body.mobile;
	var password = req.body.password;
	user.updateProfile(
		firstname,
		lastname,
		mobile,
		password,
		sessions.username,
		function(result) {
			res.send(result);
		}
	);
});

app.post('/getpost', function(req, res) {
	console.log(sessions);
	post.getPost(sessions.username, function(result) {
		res.send(result);
	});
});

app.post('/getPostAll', function(req, res) {
	post.getPostAll(function(result) {
		res.send(result);
	});
});

app.post('/deletePost', function(req, res) {
	var id = req.body.id;
	post.deletePost(id, function(result) {
		res.send(result);
	});
});

app.post('/getProfile', function(req, res) {
	console.log(sessions);
	user.getUserInfo(sessions.username, function(result) {
		res.send(result);
	});
});

app.post('/getPostWithId', function(req, res) {
	var id = req.body.id;
	post.getPostWithId(id, function(result) {
		res.send(result);
	});
});
