const express = require('express');
var createError = require('http-errors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const app = express();
var db = require('./database');
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
    cookie : {maxAge : 9999999999999}
}));

app.use(function(req, res, next) {
    res.locals.mail = req.session.mail;
    next();
});


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

router.use(function(req,res,next) {
    console.log('/',req.method);
    next();
});

router.get('/',function(req,res) {
    res.sendFile(path + 'index.html');
});

// router.get('/order',function(req,res) {
//     res.render(path + '/order-book.ejs');
// });

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

// router.get('/menu-list',function(req,res) {
//     res.render(path + '/order-book.ejs');
// });


// Fetch data and display start
app.get('/order',(req,res)=>{
    res.redirect('/read1')
})
app.get('/read1',(req,res,next)=>{
    var sql="select * from dishes";
    db.query(sql,(err,data)=>{
        if(err) throw err;
        res.render('order-book', { title: 'User List', userData: data})
    })
})
// Fetch data and display end

//Routes start
var registerRouter = require('./routes/register-route');
var loginRouter = require('./routes/login-route');
var dashRouter = require('./routes/main-dash-route');
var logoutRouter = require('./routes/logout-route');
var usersRouter = require('./routes/users');

app.use('/',registerRouter);
app.use('/',loginRouter);
app.use('/',dashRouter);
app.use('/',logoutRouter);
app.use('/users', usersRouter);
//Routes end

app.get('/',(req,res)=>{
    res.redirect('/read')
})
app.get('/read',(req,res)=>{
    var sql="select * from users";
    db.query(sql,(err,data)=>{
        if(err) throw err;
        res.render('user_index', { title: 'User List', userData: data})
})
})
app.get('/add-user',(req,res)=>{
    res.render('user_add')
})
app.post('/add-done',(req,res)=>{
    var sql="insert into users values ('" + req.body.u_id + "','" + req.body.f_name + "','" + req.body.l_name + "','" + req.body.email + "','" + req.body.contact_no +"')";
    db.query(sql,(err,data)=>{
        if(err) throw err;
        res.redirect('/')
    })
})
app.get('/edit/:u_id',(req,res)=>{
    let sql="select * from users where u_id='"+req.params.u_id+"'"
    let query=db.query(sql,(err,data)=>{
        if(err) throw err
        res.render('user_edit', { title: 'User List', user: data[0]})
    })
})
app.post('/update',(req,res)=>{
    const userId=req.body.u_id
    let sql="update users set f_name='"+req.body.f_name+"',l_name='"+req.body.l_name+"',email='"+req.body.email+"',contact_no='"+req.body.contact_no+"' where u_id='"+req.body.u_id+"'"
    db.query(sql,(err,data)=>{
        if(err) throw err;
        res.redirect('/')
    })
})
app.get('/delete/:u_id',(req,res)=>{
    let sql="delete from users where u_id='"+req.params.u_id+"'"
    let query=db.query(sql,(err,data)=>{
        if(err) throw err
        res.redirect('/')
})
})

app.use(express.static(path));
app.use('/',router);

app.listen(port,function() {
    console.log(`Application listening on port ${port}.`);
});