exports.config = {
    userSession: (app, session) => {
        app.use(session({
            secret: 'oauth demo app for practical purpose only',
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 24 * 60 * 60 * 1000
            }
        }))
    },
    googleStrategy: (passport, GoogleStrategy, User) => {
        passport.use(new GoogleStrategy({
            clientID: `${process.env.CLIENT_ID}`,
            clientSecret: `${process.env.CLIENT_SECRET}`,
            callbackURL: `${process.env.CALLBACK_URL}`,
          },
          function(accessToken, refreshToken, profile, cb) {
              console.log(profile)
            User.findOne({ googleID : profile.id })
                .then((user) => {
                    if (user) {
                        // User is logging-in
                        return cb(null, user)
                    }
                    else {
                        new User({
                            name: "Ivan",
                            email: "ivan@abv.bg",
                            googleID: profile.id
                        })
                        .save()
                        .then((user) => {
                            // New User Created
                            return cb(null, user)
                        })
                    }
                })
                .catch(err => {console.log(err)})
          }
        ))
    },
    initUserInOauthRequest: (passport, User) => {
        passport.serializeUser(function(user, done) {
          done(null, user);
        });
        passport.deserializeUser(function(user, done) {
          User.findById({_id: user._id}, function (err, user) {
            console.log('Found user ->', user)
            done(err, user);
          });
        });
      },
    handlebars: (app, expressHbs) => {
        // Register Handlebars view engine
        app.engine('.hbs', expressHbs({defaultLayout: 'main', extname: '.hbs'}));
        // Use Handlebars view engine
        app.set('view engine', '.hbs');
    }
};

