/**
 * Filename: index.js
 * Authors: Sidney Nguyen
 * Date Created: March 22, 2017
 */

//
// DEPENDENCIES
//
var express = require('express');
var router = express.Router();
var path = require('path');

//
// ROUTES
//

/**
 * GET /
 * Send index.html.
 */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

/**
 * GET /register
 * Send register.html.
 */
router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

/**
 * GET /login/
 * Send login.html.
 */
router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

/**
 * GET /create/
 * Send create.html.
 */
router.get('/create', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'create.html'));
});

/**
 * GET /song/:id/
 * Send song.html.
 */
router.get('/song/:id', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'song.html'));
});

/**
 * GET /profile/
 * Send profile.html.
 */
router.get('/profile', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});

module.exports = router;
