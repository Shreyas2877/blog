const express = require('express');
const router = express.Router();

router.post('/events', (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

module.exports = router;
