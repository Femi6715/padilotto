const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { config } = require('./database'); // Or wherever you store your secret
const AdminUser = require('../models/admin');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Use an environment variable if available; otherwise, fallback to config.secret
opts.secretOrKey = process.env.JWT_SECRET || config.secret;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    AdminUser.findById(jwt_payload.data._id, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  }));
};
