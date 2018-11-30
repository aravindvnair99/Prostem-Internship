var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Blog = require('../../models/Blog');
router.get('/', function (req, res) {
	res.render('index')
});
router.route('/insert')
	.post(function (req, res) {
		var blog = new Blog();
		blog.description = req.body.desc;
		blog.amount = req.body.amount;
		blog.month = req.body.month;
		blog.year = req.body.year;
		blog.save(function (err) {
			if (err)
				res.send(err);
			res.send('Blog successfully added!');
		});
	})
router.route('/update')
	.post(function (req, res) {
		const doc = {
			description: req.body.description,
			amount: req.body.amount,
			month: req.body.month,
			year: req.body.year
		};
		console.log(doc);
		Blog.update({ _id: req.body._id }, doc, function (err, result) {
			if (err)
				res.send(err);
			res.send('Blog successfully updated!');
		});
	});
router.get('/delete', function (req, res) {
	var id = req.query.id;
	Blog.find({ _id: id }).remove().exec(function (err, blog) {
		if (err)
			res.send(err)
		res.send('Blog successfully deleted!');
	})
});
router.get('/getAll', function (req, res) {
	var monthRec = req.query.month;
	var yearRec = req.query.year;
	if (monthRec && monthRec != 'All') {
		Blog.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function (err, blogs) {
			if (err)
				res.send(err);
			res.json(blogs);
		});
	} else {
		Blog.find({ year: yearRec }, function (err, blogs) {
			if (err)
				res.send(err);
			res.json(blogs);
		});
	}
});
module.exports = router;