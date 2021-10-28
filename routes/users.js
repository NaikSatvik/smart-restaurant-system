var express = require('express');
var router = express.Router();
var db=require('../database');
const app1 = express();
const bodyParser = require('body-parser');
app1.use(bodyParser.json());

//display data
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM dishes ';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});

//delete data
router.get('/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM dishes WHERE d_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
  
});

//update data
router.get('/edit/:id', function(req, res, next) {
      var UserId= req.params.id;
      var sql=`SELECT * FROM dishes WHERE d_id=${UserId}`;
      db.query(sql, function (err, data) {
        if (err) throw err;
       
        res.render('users-form', { title: 'User List', editData: data[0]});
      });
});


router.post('/edit/:id', function(req, res, next) {
  var id= req.params.id;
  console.log(id);
    var updateData =req.body.fullName;
    var sql = 'update dishes set d_amt=? where d_id=?';
    db.query(sql, [updateData,id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
  
});


//add data

router.get('/add_1/:id', function(req, res, next) {
      var UserId= req.params.id;
      var sql=`SELECT * FROM dishes WHERE d_id=${UserId}`;
      db.query(sql, function (err, data) {
        if (err) throw err;
       
        res.render('add', { title: 'User List', editData1: data[0]});
      });

  });

//router.get( 'add_1/:id',function(req, res, next) {
////      var UserId= req.params.id;
////      var sql=`SELECT * FROM dishes WHERE d_id=${UserId}`;
//       
//       
//        res.render('add', { title: 'User List', editData1: data[0]});
//     
//
//  });

router.post('/add_1', function(req, res, next) {
//  var id= req.params.id;
//  console.log(id);
    var dish_name =req.body.d_Name;
    var dish_cat=req.body.d_cat;
    var dish_amt=req.body.d_amt;
    var sql = 'insert into dishes( `d_name`, `d_amt`, `d_cat`) values(?,?,?)';
    db.query(sql, [dish_name,dish_amt,dish_cat], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
  
});

module.exports = router;

// write here create & display data script
 


