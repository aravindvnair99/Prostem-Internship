var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    name: String,
    content: String,
    author: String,
    month: Number,
    year: Number
});
module.exports = mongoose.model('Blog', blogSchema);