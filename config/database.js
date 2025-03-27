// module.exports = {
//     database: "mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/?retryWrites=true&w=majority&appName=padi",
//     secret: "whatismysecret"
// }
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/?retryWrites=true&w=majority&appName=padi';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a secret for JWT signing and verification.
// You can set this using an environment variable JWT_SECRET in production.
// config/config.js
module.exports = {
  secret: 'whatismysecret' // Replace with your actual secret
};


// module.exports = { mongoose, config };
