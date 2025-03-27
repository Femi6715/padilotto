// config/database.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true&w=majority&appName=padi';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const config = {
  secret: 'yourSuperSecretKey' // Replace with your actual secret
};

module.exports = { mongoose, config };
