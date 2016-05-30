var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var kidlogin = require ('config/kidlogin');


module.exports = function(app) {


     app.get('/', function(req, res) {

          res.end("parents");
     });

     app.post('/login',function(req,res){
          var email = req.body.email;
          var password = req.body.password;

          login.login(email,password,function (err, info) {
               if (err) {
                 console.log(err);
                 res.status(400).send(err);
                 return
               }
               res.status(200).send(info);
              });
     });

     app.post('/register',function(req,res){
       console.log('enter register');
          var email = req.body.email;
          var password = req.body.password;
          var fullname = req.body.fullname;
          var username = req.body.username;
          var age = req.body.age;

          register.register(email,password,fullname,username,age,function(err , info) {
              if (err) {
                console.log(err);
                res.status(400).send(err);
                return
              }
              console.log(info);
              res.status(200).send(info);
             });
     });

     app.post('/kidlogin',function(req,res){
       console.log('kid collection');
       var email = req.body.email;
       var password = req.body.password;
       var kidId = req.body.id;

       kidlogin.kidlogin(email,password,kidId,function(err,info){
         if (err) {
           console.log(err);
           res.status(400).send(err);
           return
         }
         console.log(info);
         res.status(200).send(info);
       });
     });

     app.post('/api/chgpass', function(req, res) {
          var id = req.body.id;
               var opass = req.body.oldpass;
          var npass = req.body.newpass;

          chgpass.cpass(id,opass,npass,function(found){
               console.log(found);
               res.json(found);
     });
     });

     app.post('/api/resetpass', function(req, res) {

          var email = req.body.email;

          chgpass.respass_init(email,function(found){
               console.log(found);
               res.json(found);
     });
     });

     app.post('/api/resetpass/chg', function(req, res) {
          var email = req.body.email;
          var code = req.body.code;
          var npass = req.body.newpass;

     chgpass.respass_chg(email,code,npass,function(found){
          console.log(found);
          res.json(found);

     });
     });
};
