var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://team:team123@ds247407.mlab.com:47407/prostemintern';

module.exports = {
	signup: function (name, email, password) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').insertOne({
				"name": name,
				"email": email,
				"password": password
			}, function (err, result) {
				assert.equal(err, null);
				console.log("Saved the user sign up details.");
			});
		});
	},
	getUserInfo: function (username, callback) {
		MongoClient.connect(url, function (err, db) {
			db.collection('user').findOne({
				email: username
			}, function (err, result) {
				if (result == null) {
					console.log('returning false')
					callback(false)
				}
				else {
					console.log('returning true')
					callback(result);
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
					assert.equal(err, null);
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