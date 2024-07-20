const mongoose = require('mongoose');
const config = require('./config.js');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
