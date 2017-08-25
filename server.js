var express = require('express');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var port = process.env.PORT||5000;

var app = express();
app.use(morgan('dev'));

//view engine
app.engine('.hbs', exphbs({defaultLayout: 'layout',
    partialsDir: __dirname+'/views/partials',
    layoutsDir: __dirname+'/views/layouts',
    extname:'.hbs'
}));


app.set('view engine', '.hbs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'codeworkrsecret',
    saveUninitialized: false,
    resave: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req,res,next) {
    res.locals.success_message = req.flash('success');
    res.locals.error_message = req.flash('error');
    next();
});

var routes = {
    index : require('./routes/index'),
    users : require('./routes/users')
}

app.use('/',routes.index);
app.use('/users',routes.users);

app.listen(port,function (error,data) {
    console.log('Server is running on the port 5000');
})