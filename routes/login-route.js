var express = require('express');
var router = express.Router();
var db = require('../database');
var path = require('path')
const app1 = express();
const path1 = path.join(__dirname,'../');
const bodyParser = require('body-parser');
let alert = require('alert');
const session = require('express-session');


app1.use(bodyParser.json());

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var mail = req.body.mail;
    var pass = req.body.pass;

    var sql = 'SELECT * FROM users WHERE email = ? AND pass = ?';
    db.query(sql,[mail,pass], function(err,data,fields) {
        if (err) throw err;
        if(data.length>0) {
            if (mail == 'admin@gmail.com') {
                res.redirect('/read');
            } else {
                req.session.loggedinUser = true;
                req.session.mail = mail;
                res.redirect('/main-dash');
            }
        } else {
            alert('Incorrect Credentials');
            res.sendFile(path1 + 'views/login.html');
        }
    });
});
module.exports = router;