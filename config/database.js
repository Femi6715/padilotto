const mongoose = require('mongoose');

module.exports = {
    database: "mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true",
    secret: "yourSuperSecretKey"
}


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// // // Option 1: Export only mongoose
// // //module.exports = mongoose;

// // // Option 2: Export an object containing mongoose and other config values
// // module.exports = { mongoose, secret: 'yourSuperSecretKey' };

// config/database.js
// const mongoose = require('mongoose');

// // Use the environment variable MONGO_URI if set, otherwise use the fallback string.
// const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true&w=majority&appName=padi';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // For testing only (not recommended in production):
  tlsAllowInvalidCertificates: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
