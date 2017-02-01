var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../databases/MongooseAdapter');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  var auth = {
    isAuthenticated: req.isAuthenticated()
  }
  res.json(auth);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res) {
  var user = req.body;
  var newUser = new User({
    username: user.username,
    password: user.password,
    email: user.email
  });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      db.insertUser(newUser, function(err, user) {
        if (err) {
          return res.send(err);
        }
        res.redirect('/login');
      });
    });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

passport.use(new LocalStrategy(function(username, password, done) {
  db.selectUserByUsername(username, function(err, user) {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return done(null, false, {message: 'Incorrect username or password'});
    }
    bcrypt.compare(password, user.password, function(err, isValid) {
      if (err) {
        return res.send(err);
      }
      if (!isValid) {
        return done(null, false, {message: 'Incorrect username or password'});
      }
      return done(null, user);
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.selectUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
