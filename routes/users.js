var router = require('express').Router();
var flash = require('connect-flash');
var Joi = require('joi');
var User = require('../model/users');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


//validation schema
var userSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    username : Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,9}$/).required(),
    confirmPassword : Joi.any().valid(Joi.ref('password')).required()
});

router.get('/login',function (req,res,next) {
    res.render('index');
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        //failureRedirect: 'users/login',
        failureFlash:true}),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        //res.redirect('/users/' + req.user.username);
        res.redirect('/');
    });

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy(
    function(email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            User.comparePassword(password,user.password,function (err,isMatch) {
                if(err) return done(err) ;
                if(isMatch){
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Incorrect password.' })
                }
            });


        });
    }
));

router.get('/register',function (req,res,next) {
    res.render('signup');
});

router.post('/register',function (req,res,next) {
    var result = Joi.validate(req.body,userSchema);
    if(result.error){
        console.log('error');
        req.flash('error','Data is not valid');
        res.redirect('/users/register');
        return;
    }
    //check email is already exits
    // var user = User.findOne({'email':result.value.email});
    // console.log(user);
    // if(user){
    //     console.log('Email is already in use');
    //     req.flash('error','Email is already in use');
    //     res.redirect('/users/register');
    //     return;
    // }
    else{
        console.log('No Error');
        var newUser = new User({
            email:result.value.email,
            username:result.value.username,
            password:result.value.password
        });

        User.createUser(newUser,function (err,user) {
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg','You are registered and can now login ');
        res.location('/');
        res.redirect('/users/login');
    }
    console.log(result);
});

module.exports = router;