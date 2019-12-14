const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); 
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connecting mongodb 
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// By default express don't use cookies, so we use package cookie-session
// which will set our cookie with encryption provided by us 
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// making sure that passport know to make use of cookie 
app.use(passport.initialize());
app.use(passport.session());

// auth routes setup 
require('./routes/authRoutes')(app);
require('./routes/payment')(app);

app.listen(PORT);