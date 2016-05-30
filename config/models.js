var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
     token : String,
     email: String,
     hashed_password: String,
     fullname : String,
     username : String,
     age : String,
     salt : String,
     temp_str:String
});

mongoose.connect('mongodb://localhost:27017/parents');
module.exports = mongoose.model('parentusers', userSchema);
