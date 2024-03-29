const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); 
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const path = require('path');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// connecting mongodb 
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

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
require('./routes/surveyRoutes')(app);

if( process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    app.use(express.static('client/build'));

    // Express will serve up the index.html file if,
    // it doesn't recognize the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT);