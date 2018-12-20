var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://team:team123@ds247407.mlab.com:47407/prostemintern';

module.exports = {
	addPost: function(title, content, category, email, callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('post').insertOne(
					{
						title: title,
						content: content,
						category: category,
						email: email
					},
					function(err, result) {
						console.log('Saved the blog post details.');
						if (err == null) {
							callback(true);
						} else {
							callback(false);
						}
					}
				);
			}
		);
	},
	addCategory: function(categoryName, callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('category').insertOne(
					{
						name: categoryName
					},
					function(err, result) {
						console.log('Saved the category details.');
						if (err == null) {
							callback(true);
						} else {
							callback(false);
						}
					}
				);
			}
		);
	},
	getCategory: function(callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('category', function(err, collection) {
					collection.find().toArray(function(err, list) {
						callback(list);
					});
				});
			}
		);
	},
	updatePost: function(id, title, content, category, callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('post').updateOne(
					{ _id: new mongodb.ObjectID(id) },
					{
						$set: {
							title: title,
							content: content,
							category: category
						}
					},
					function(err, result) {
						console.log('Updated the blog post details.');
						if (err == null) {
							callback(true);
						} else {
							callback(false);
						}
					}
				);
			}
		);
	},
	getPost: function(username, callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('post', function(err, collection) {
					collection
						.find({ email: username })
						.toArray(function(err, list) {
							callback(list);
						});
				});
			}
		);
	},
	getPostAll: function(callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('post', function(err, collection) {
					collection.find().toArray(function(err, list) {
						callback(list);
					});
				});
			}
		);
	},
	deletePost: function(id, callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('post').deleteOne(
					{
						_id: new mongodb.ObjectID(id)
					},
					function(err, result) {
						console.log('Deleted the post.');
						if (err == null) {
							callback(true);
						} else {
							callback(false);
						}
					}
				);
			}
		);
	},
	getPostWithId: function(id, callback) {
		MongoClient.connect(
			url,
			function(err, db) {
				db.collection('post').findOne(
					{
						_id: new mongodb.ObjectID(id)
					},
					function(err, result) {
						console.log('Retrived the entry.');
						if (err == null) {
							callback(result);
						} else {
							callback(false);
						}
					}
				);
			}
		);
	}
};
