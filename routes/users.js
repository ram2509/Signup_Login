var router = require('express').Router();

router.get('/login',function (req,res,next) {
    res.render('index');
});

router.get('/register',function (req,res,next) {
    res.render('signup');
});

module.exports = router;