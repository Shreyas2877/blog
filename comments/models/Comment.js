const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: String,
  content: String,
  postId: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
