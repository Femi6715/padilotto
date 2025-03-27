const mongoose = require('mongoose');

//const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true&w=majority&appName=padi';
const mongoURI = process.env.MONGO_URI ||  'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true&w=majority&appName=padi';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Option 1: Export only mongoose
//module.exports = mongoose;

// Option 2: Export an object containing mongoose and other config values
module.exports = { mongoose, secret: 'yourSuperSecretKey' };
