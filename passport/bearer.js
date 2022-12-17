const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');



passport.use(new BearerStrategy(
  (token, done) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decoded)
    Admin.findById(decoded.adminId, function (err, admin) {
      if (err) { return done(err); }
      if (!admin) { return done(null, false); }
      return done(null, admin);
    });
  }
));