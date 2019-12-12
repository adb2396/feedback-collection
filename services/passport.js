const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessTocken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if(existingUser) {
                // User record exist in DB
                done(null, existingUser);
            } else {
                // User record not exist, create a new record
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user)); 

            }
        });
    })
);