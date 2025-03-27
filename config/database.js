const mongoose = require('mongoose');

module.exports = {
    database: "mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/padi?retryWrites=true",
    secret: "yourSuperSecretKey"
}


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Option 1: Export only mongoose
//module.exports = mongoose;

// Option 2: Export an object containing mongoose and other config values
module.exports = { mongoose, secret: 'yourSuperSecretKey' };
