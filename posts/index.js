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

// Define a Mongoose schema and model for posts
const postSchema = new mongoose.Schema({
  id: String,
  title: String
});

const Post = mongoose.model('Post', postSchema);

// Get Posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  const post = new Post({ id, title });

  try {
    await post.save();

    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id, title
      }
    });

    res.status(201).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Event-bus
app.post('/events', (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
