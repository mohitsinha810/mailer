const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

let server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
let server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

mongoose.connect('mongodb+srv://tastingmaster:7SKULlm0HAAJm0kh@cluster0-tq0or.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});


var User = mongoose.model('User', {name:String,email:String,number:Number,message:String});

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(logger("short"));

app.get("/",function(req,res){
	res.sendFile(path.join(__dirname + '/form.html'));
});

app.post('/', function(req, res){

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.number);

	var user = new User({ name: req.body.name, email: req.body.email, number:req.body.number, message:req.body.message });
	user.save().then(() => console.log('saved'));

	User.find(function (err, users) {
	  if (err) return console.error(err);
	  console.log(users);
	})

    res.redirect(path.join(__dirname + '/form.html'));
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});