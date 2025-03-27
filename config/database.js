// module.exports = {
//     database: "mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/?retryWrites=true&w=majority&appName=padi",
//     secret: "whatismysecret"
// }
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:62221085@padi.rfdah5x.mongodb.net/?retryWrites=true&w=majority&appName=padi';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
