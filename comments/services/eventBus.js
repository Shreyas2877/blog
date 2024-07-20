const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

router.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const comment = new Comment({ id, content, postId });
    try {
      await comment.save();
    } catch (err) {
      console.error('Error saving comment:', err);
    }
  }

  res.send({});
});

module.exports = router;
