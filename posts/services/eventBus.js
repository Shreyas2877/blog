const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

module.exports = router;
