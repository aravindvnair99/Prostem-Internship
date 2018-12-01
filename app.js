var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user')

var app = express();

app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());

app.post('/signin', function (req, res) {
  var user_name=req.body.email;
  var password=req.body.password;
  user.validateSignIn(user_name,password,function(result){
    if(result){
      res.send('Success')
    }
    else{
      res.send('Wrong username pass')
    }
  });
  
  
  
})

app.post('/signup', function (req, res) {
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;

  if(name && email && password){
  	user.signup(name, email, password)
  }
  else{
  	res.send('Failure');
  }
})

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})
