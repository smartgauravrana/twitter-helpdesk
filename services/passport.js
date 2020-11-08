const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const { validPassword } = require("../utils");

const User = mongoose.model("users");

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(async function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  }).populate('organisationId');
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).select(
        "+password +salt"
      ).populate('organisationId');
      if (!user) {
        return done(null, false);
      }
      const isValid = validPassword(password, user.password, user.salt);
      if (!isValid) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log("inside err");
      return done(err);
    }
  })
);