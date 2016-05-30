var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('config/models');

exports.register = function(email,password,fullname,username,age,callback) {

  if(email.indexOf("@") == -1){
    callback({err:"Email Not Valid"});
    return;
  }

  if (!(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 )) { //&& password.match(/[0-9]/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)
    callback({err:"Password Weak"});
    return;
  }

  var temp = rand(160, 36);
  var newpass = temp + password;
  var token = crypto.createHash('sha512').update(email +rand).digest("hex");
  var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

  var newuser = new user({
    token: token,
    email: email,
    fullname : fullname,
    username : username,
    age : age,
    hashed_password: hashed_password,
    salt :temp });

    user.find({email: email},function(err,users){

      var len = users.length;
      if(len == 0){
        newuser.save(function (err) {
          callback(null,{info:"success"} );
          return;
        });
      } else {
        callback({err:"Email already Registered"});
      }
    });
  }
