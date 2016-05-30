var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var gravatar = require('gravatar');
var user = require('config/models');
var kidUser = require('config/modelsKid');

exports.kidlogin = function(email,password,kidId,callback) {

  user.find({email: email},function(err,users){

    if(err || users.length == 0){
      callback({err:"User not exist",'res':false}, null);
    }


    var temp = users[0].salt;
    var hash_db = users[0].hashed_password;
    var id = users[0].token;
    var newpass = temp + password;
    var token = crypto.createHash('sha512').update(email +rand).digest("hex");
    var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
    var grav_url = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
    if(hash_db == hashed_password){
      var newuser = new user({
        token: token,
        kidId : id
       });
          kidUser.find({email: email},function(err,users){
          var len = users.length;
          if(len == 0){
            newuser.save(function (err) {
              callback(null, {info:"Login Sucess"});
              return;
              });
          }
          });
    }else{
      callback({err:"Invalid Password",'res':false}, null);
    }});
}
