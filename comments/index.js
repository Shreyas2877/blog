const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const commentSchema = new mongoose.Schema({
  id: String,
  content: String,
  postId: String
});

const Comment = mongoose.model('Comment', commentSchema);

app.get('/posts/:id/comments', async (req, res) => {
  const comments = await Comment.find({ postId: req.params.id });
  res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comment = new Comment({
    id: commentId,
    content,
    postId: req.params.id
  });

  await comment.save();

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }
  });

  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const comment = new Comment({ id, content, postId });
    await comment.save();
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
