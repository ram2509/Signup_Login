var express = require('express');
var morgan = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
var port = process.env.PORT||5000;

const app = express();
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

app.use(flash());

var routes = {
    index : require('./routes/index'),
    users : require('./routes/users')
}

app.use('/',routes.index);
app.use('/users',routes.users);

app.listen(port,function (error,data) {
    console.log('Server is running on the port 5000');
})