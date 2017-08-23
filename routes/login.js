var express = require('express');
var router = express.Router();

//get the login page
router.get('/login',function (req,res,next) {
    res.render('login');
});