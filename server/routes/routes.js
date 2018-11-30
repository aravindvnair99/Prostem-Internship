var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Article = require('../../models/article');
router.get('/', function (req, res) {
	res.render('index')
});
router.route('/insert')
	.post(function (req, res) {
		var article = new Article();
		article.name = req.body.name;
		article.content = req.body.content;
		article.author = req.body.author;
		article.month = req.body.month;
		article.year = req.body.year;
		article.save(function (err) {
			if (err)
				res.send(err);
			res.send('Article successfully added!');
		});
	})
router.route('/update')
	.post(function (req, res) {
		const doc = {
			name: req.body.name,
			content: req.body.content,
			author: req.body.author,
			month: req.body.month,
			year: req.body.year
		};
		console.log(doc);
		Article.update({ _id: req.body._id }, doc, function (err, result) {
			if (err)
				res.send(err);
			res.send('Article successfully updated!');
		});
	});
router.get('/delete', function (req, res) {
	var id = req.query.id;
	Article.find({ _id: id }).remove().exec(function (err, article) {
		if (err)
			res.send(err)
		res.send('Article successfully deleted!');
	})
});
router.get('/getAll', function (req, res) {
	var monthRec = req.query.month;
	var yearRec = req.query.year;
	if (monthRec && monthRec != 'All') {
		Article.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function (err, articles) {
			if (err)
				res.send(err);
			res.json(articles);
		});
	} else {
		Article.find({ year: yearRec }, function (err, articles) {
			if (err)
				res.send(err);
			res.json(articles);
		});
	}
});
module.exports = router;