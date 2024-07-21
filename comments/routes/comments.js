const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const Comment = require('../models/Comment');

const router = express.Router();

router.get('/posts/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comment = new Comment({
    id: commentId,
    content,
    postId: req.params.id
  });

  try {
    await comment.save();

    await axios.post('http://event-bus-srv:4005/events', {
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

module.exports = router;
