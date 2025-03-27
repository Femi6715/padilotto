// config/database.js
const mongoose = require('mongoose');

// Ensure the fallback string includes the database name ("padi") and all query parameters:
const mongoURI = process.env.MONGO_URI || 
  'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true&w=majority&appName=padi';

console.log('Using mongoURI:', mongoURI); // Debug: Check what is being used

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
