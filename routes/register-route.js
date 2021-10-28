var express = require('express');
var router = express.Router();
var db = require('../database');
var path = require('path')
const app1 = express();
const path1 = path.join(__dirname,'../');
const bodyParser = require('body-parser');
let alert = require('alert');

app1.use(bodyParser.json());

router.get('/register', function (req, res, next) {
    res.render('signUp');
});

router.post('/register', function (req, res, next) {
    inputData = {
        f_name: req.body.fname,
        l_name: req.body.lname,
        email: req.body.mail,
        pass: req.body.pass,
        contact_no: req.body.contact,
    }

    inputData2 = {
        pass1: req.body.pass1
    }
    console.log(inputData);
    var sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [inputData.email], function (err, data, fields) {
    if (err) throw err
    if (data.length > 1) {
        var msg1 = inputData.email + " was already exist"; 
        alert(msg1);
        res.sendFile(path1 + 'views/login.html');
    } else if (inputData2.pass1 != inputData.pass) {
        var passnotmatch = inputData.f_name + ' ' +inputData.l_name + " your password didn't matched."; 
        alert(passnotmatch);
        res.sendFile(path1 + 'views/signUp.html');

    } else {
        // save users data into database
        var sql = 'INSERT INTO users SET ?';
        db.query(sql, inputData, function (err, data) {
            if (err) throw err;
        });
        var msg3 = inputData.f_name + ' ' + inputData.l_name + " You are successfully registered";
        alert(msg3);
        res.sendFile(path1 + 'views/login.html');
    }
    // console.log(path1);
    
})
});
module.exports = router;