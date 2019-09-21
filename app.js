require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')
const { config } = require('./_config')
const { setLocals } = require('./middlewares/index')
const expressHbs = require('express-handlebars')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User')
const defaultRoutes = require('./routes/default')
const oAuthRoutes = require('./routes/oauth')

config.googleStrategy(passport, GoogleStrategy, User)
config.initUserInOauthRequest(passport, User)
config.userSession(app, session);

app.use(passport.initialize());
app.use(passport.session());

config.handlebars(app, expressHbs)

app.use(setLocals)
app.use(express.static(__dirname + '/public'))

app.use(defaultRoutes)
app.use(oAuthRoutes)

const port = process.env.PORT || 3000;

mongoose
.connect(
    process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }
)
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    });
})
.catch(err => {throw err;});

