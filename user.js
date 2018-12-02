var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://team:team123@ds247407.mlab.com:47407/prostemintern';

module.exports = {
	signup: function (firstname, lastname, gender, email, mobile, password, password2, callback) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').insertOne({
				"firstname": firstname,
				"lastname": lastname,
				"gender": gender,
				"email": email,
				"mobile": mobile,
				"password": password,
				"password2": password2
			}, function (err, result) {
				if (result == null) {
					console.log('Error saving user details on signup.')
					callback(false)
				} else {
					console.log("Saved user sign up details.");
					callback(true)
				}

			});
		});
	},
	getUserInfo: function (username, callback) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').findOne({
				email: username
			}, function (err, result) {
				if (result == null) {
					console.log('getUserInfo failed')
					callback(false)
				}
				else {
					console.log('getUserInfo success')
					callback(result);
				}
			});
		});
	},
	checkEmail: function (username, callback) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').findOne({
				email: username
			}, function (err, result) {
				if (result == null) {
					console.log('Email does not exist.')
					callback(false)
				}
				else {
					console.log('Email already exists.')
					callback(true);
				}
			});
		});
	},
	updateProfile: function (name, password, username, callback) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').updateOne(
				{ "email": username },
				{
					$set:
					{
						"name": name,
						"password": password
					}
				}, function (err, result) {
					console.log("Updated user details.");
					if (err == null) {
						callback(true)
					}
					else {
						callback(false)
					}
				});
		});
	},
	validateSignIn: function (username, password, callback) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').findOne({
				email: username, password: password
			}, function (err, result) {
				if (result == null) {
					console.log('returning false')
					callback(false)
				}
				else {
					console.log('returning true')
					callback(true)
				}
			});
		});
	}
}