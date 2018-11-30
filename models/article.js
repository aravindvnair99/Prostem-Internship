var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema({
    name: String,
    content: String,
    author: String,
    month: Number,
    year: Number
});
module.exports = mongoose.model('Article', articleSchema);