var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.sendFile('index.html');
});

router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

module.exports = router;
