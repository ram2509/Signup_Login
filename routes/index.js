var express = require('express');
var router = express.Router();

//get the home page
router.get('/',function (req,res,next) {
    res.render('index');
});


module.exports = router;