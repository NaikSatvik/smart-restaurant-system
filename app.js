const express = require('express');
const bodyParser = require('body-parser');
var ejs = require('ejs');
const app = express();
const router = express.Router();
const path = __dirname + '/views';
const port = 8081;
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(session({
    secret : '12345',
    resave : false,
    saveUninitialized : true,
    cookie : {maxAge : 100000000000000000}
}));

app.use(function(req, res, next) {
    res.locals.mail = req.session.mail;
    next();
});



// app.set('view engine','html'); 
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
router.use(function(req,res,next) {
    console.log('/',req.method);
    next();
});

router.get('/',function(req,res) {
    res.sendFile(path + 'index.html');
});

router.get('/main',function(req,res) {
    res.render(path + '/main.ejs');
});

router.get('/login1',function(req,res) {
    res.sendFile(path + '/login.html');
});

router.get('/logout',function(req,res) {
    res.sendFile(path + '/login.html');
});

router.get('/signup',function(req,res) {
    res.sendFile(path + '/signUp.html');
});

router.get('/main-dash',function(req,res) {
    res.render(path + '/main.ejs');
});

//Routes start
var registerRouter = require('./routes/register-route');
var loginRouter = require('./routes/login-route');
var dashRouter = require('./routes/main-dash-route');
var logoutRouter = require('./routes/logout-route');

app.use('/',registerRouter);
app.use('/',loginRouter);
app.use('/',dashRouter);
app.use('/',logoutRouter);
//Routes end

app.use(express.static(path));
app.use('/',router);

app.listen(port,function() {
    console.log(`Application listening on port ${port}.`);
});