const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const commentRoutes = require('./routes/comments');
const eventBusRoutes = require('./services/eventBus');
const config = require('./config/config.js')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', commentRoutes);
app.use('/events', eventBusRoutes);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
