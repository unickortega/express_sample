var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator')
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'beagle_011818'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('Select * from users where id=? limit 3',[2], function (err, result) {
if (err) throw err;
console.log(result);
});

var app = express();

// var logger = function(req, res, next){
//     console.log('logging...');
//     next();
// }

// app.use(logger);

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended' : false }));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator
app.use(expressValidator());

// Global variables
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});



var users = [
    {
        name:"Uelmar",
        age:"22"
    },
    {
        name:"Uelmar",
        age:"22"
    },
    {
        name:"Uelmar",
        age:"22"
    }
];

app.get('/', function(req, res){
    var title = "express";
    res.render('index', {
        title:"Express",
        users:users
    });
});

app.post('/users/add', function(req, res){
    console.log(req.body.first_name);

    req.checkBody('first_name', 'First Name is required.').notEmpty();
    req.checkBody('last_name', 'Last Name is required.').notEmpty();
    req.checkBody('email', 'Email Name is required.').notEmpty();

    var errors = req.validationErrors();

    if(errors)
    {
        console.log(errors);
        res.render('index', {
            title:"Express",
            errors:errors,
            users:users
        });
    }
    else
    {
        var newUser = {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
        };

        console.log('Success')
    }

});

app.listen(3000, function(){
    console.log('server started on port 3000...');
});