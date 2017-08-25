var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var saltRounds = 10;

mongoose.connect('mongodb://localhost/rbSignup');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : String,
    username : String,
    password : String
},{
    timeStamps :{
        createdAt : 'createdAt',
        updateAt  : 'updateAt'
    }
});

var User = mongoose.model('user',userSchema);
module.exports = User;

module.exports.getUserById = function (id,callback) {
    User.findById(id,callback);
};

module.exports.getUserByEmail = function (email,callback) {
    var query = {email:email};
    User.findOne(query,callback);
};

module.exports.comparePassword = function (password,hash,callback) {
    // Load hash from your password DB.
    bcrypt.compare(password, hash, function(err, isMatch) {
        callback(null,isMatch);
    });
}

module.exports.createUser = function (newUser,callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
