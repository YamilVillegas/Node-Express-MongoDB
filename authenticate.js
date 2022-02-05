const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
}; // expiresIn tells the token when to expire

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
// opts.jwtFromRequest is specifying the webtoken to be sent as an AuthHeader & As a Bearer Token. This is the simplest method to send a JSON web token.

exports.jwtPassport = passport.use(
    new JwtStrategy( // Constructor
        opts, // 1st Argument (opts was created earlier)
        (jwt_payload, done) => { // Can be found in passport documentation
            console.log('JWT payload:', jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false); // if there is an error
                } else if (user) {
                    return done(null, user); // if there is no error
                } else {
                    return done(null, false); // no error, no document found 
                }
            }); // We can add code to prompt to create a new user account
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', {session: false});
// Verify's that the user has been authenticated
// We export it to verifyUser so we do not have to keep writing it over many times

exports.verifyAdmin = (req, res, next) => {
    if(!req.user.admin) {
        const err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        next(err);
    } else {
        next();
    }
}