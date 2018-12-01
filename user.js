var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://team:team123@ds247407.mlab.com:47407/prostemintern';

module.exports = {
	signup: function (name, email, password) {
		MongoClient.connect(url, { useNewUrlParser: true }, function (err, database) {
			database.db('prostemintern').collection('user').insertOne({
				"name": name,
				"email": email,
				"password": password
			}, function (err, result) {
				assert.equal(err, null);
				console.log("Saved the user sign up details.");
			});
		});
	},
	validateSignIn: function (username, password, callback) {
		MongoClient.connect(url, { useNewUrlParser: true }, function (err, database) {
			console.log(username, password);
			database.db('prostemintern').collection('user').findOne({
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