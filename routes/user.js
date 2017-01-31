var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

router.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
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
      newUser.save(function(err, user) {
        if (err) {
          res.send(err);
        }
        res.json(user);
        res.redirect('/user/login');
      });
    });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}));

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
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
  User.findOne({_id: id}, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
