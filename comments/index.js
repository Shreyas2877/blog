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
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a Mongoose schema and model for comments
const commentSchema = new mongoose.Schema({
  id: String,
  postId: String,
  content: String
});

const Comment = mongoose.model('Comment', commentSchema);

// Get Comments
app.get('/posts/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add Comments
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comment = new Comment({
    id: commentId,
    postId: req.params.id,
    content
  });

  try {
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
  } catch (err) {
    res.status(500).send(err);
  }
});

// Event-bus
app.post('/events', (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
