var express = require('express');
var router = express.Router();

router.get('/main',function(req,res,next) {
    if (req.session.loggedinUser) {
        res.render('main-dash',{mail:req.session.mail})
    } else {
        res.redirect('/login1');
    }
});
module.exports = router;