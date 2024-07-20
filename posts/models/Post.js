const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: String,
  title: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
