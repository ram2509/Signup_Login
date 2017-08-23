var express = require('express');
var router = express.Router();

//get the signup page
router.get('/signup',function (req,res,next) {
    res.render('signup');
});

//post request on user signup
router.post('/signup',function (req,res,next) {
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;


    //user input validation


})
