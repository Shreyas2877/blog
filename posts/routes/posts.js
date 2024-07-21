const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const Post = require('../models/Post');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  const post = new Post({ id, title });

  try {
    await post.save();

    await axios.post('http://event-bus-srv:4005/events', {
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

module.exports = router;
