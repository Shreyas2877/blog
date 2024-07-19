const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

var cors = require('cors')

app.use(cors())

const posts = {};

//Get Posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

//Create a new post
app.post('/posts', async(req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  await axios.post('http://localhost:4005/events', {
    "type" : "PostCreated",
    "data" : {
      id, title
    }
  });

  res.status(201).send(posts[id]);
});

//Event-bus
app.post('/events', (req,res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});