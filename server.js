/**
 * Filename: server.js
 * Authors: Sidney Nguyen
 * Date Created: March 22, 2017
 */

//
// DEPENDENCIES
//
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
// Database
var db = require('./databases/MongooseAdapter');
// Routes
var index = require('./routes/index');
var user = require('./routes/user');
var song = require('./routes/song');

var app = express();

// Start the database
db.connect();

//
// MIDDLEWARE
//
app.use(express.static(path.join(__dirname, 'public')));
app.use('/song', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'Love is an open door',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

//
// ROUTES
//
app.use('/', index);
app.use('/user', user);
app.use('/api/song', song);

//
// START SERVER
//
var port = 3000;
app.listen(port, function() {
  console.log('Server started on port ' + port);
});
