const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Function to handle events
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content });
    } else {
      console.error(`Post with ID ${postId} not found for comment`);
    }
  }
};

// Endpoint to get posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Endpoint to receive events from the event bus
app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

// Function to initialize the query service
const initialize = async () => {
  try {
    // Fetch posts from the posts service
    const postsRes = await axios.get('http://localhost:4000/posts');
    for (const postId in postsRes.data) {
      const post = postsRes.data[postId];
      const test = post.id;
      posts[postId] = { id: post.id, title: post.title, comments: [] };

      try {
        const commentsRes = await axios.get(`http://localhost:4001/posts/${post.id}/comments`);
        console.log(commentsRes);
        posts[postId].comments = commentsRes.data.map(comment => ({
          id: comment.id,
          content: comment.content
        }));
      } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error.message);
      }
    }

    console.log('Initialized posts with comments:', posts);
  } catch (error) {
    console.error('Error initializing query service:', error);
  }
};

// Start the server and initialize the service
app.listen(4002, async () => {
  console.log('Listening on port 4002');
  await initialize();
});
