var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var kidSchema = mongoose.Schema({
     token : String,
     kidId: String
});

// mongoose.connect('mongodb://localhost:27017/parents');
module.exports = mongoose.model('kisusers', kidSchema);
