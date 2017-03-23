var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
var db = require('../databases/MongooseAdapter');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  var userData = {
    isAuthenticated: req.isAuthenticated(),
  }
  res.json(userData);
});

router.get('/me', function(req, res, next) {
  db.selectSongsAsUser(req, function(err, songs) {
    if (err) {
      return res.send(err);
    }
    res.json(songs);
  });
});

router.get('/logout', function(req, res) {
  res.clearCookie('remember_me');
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res) {
  var user = req.body;

  if (!user.username) {
    return res.json({
      err: 'Username is required'
    });
  }
  if (!user.password) {
    return res.json({
      err: 'Password is required'
    });
  }
  if (!user.email) {
    return res.json({
      err: 'Email is required'
    });
  }

  db.selectUserByUsername(user.username, function(err, user) {
    if (err) {
      return res.send(err);
    }
    if (user) {
      return res.json({
        err: 'Username already taken'
      });
    }
  });

  var newUser = {
    username: user.username,
    password: user.password,
    email: user.email
  };

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
  failureRedirect: '/login'
}), function(req, res, next) {
  issueToken(req.user, function(err, token) {
    if (err) {
      return next(err);
    }
    res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000});
    return next();
  });
}, function(req, res) {
  res.redirect('/');
});

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

function consumeRememberMeToken(token, callback) {
  db.selectTokenByToken(token, function(err, tokenData) {
    if (err) {
      return callback(err);
    }
    if (!tokenData) {
      return callback({error: 'User not found'});
    }
    var uid = tokenData.uid;
    db.deleteTokenByToken(token, function(err, token) {
      if (err) {
        return callback(err);
      }
      return callback(null, uid);
    });
  });
}

function saveRememberMeToken(token, uid, callback) {
  db.insertToken({token: token, uid: uid}, function(err, token) {
    if (err) {
      return callback(err);
    }
    return callback();
  });
}

function issueToken(user, done) {
  var token = 'abcd';
  saveRememberMeToken(token, user._id, function(err) {
    if (err) {
      return done(err);
    }
    return done(null, token);
  })
}

passport.use(new RememberMeStrategy(function(token, done) {
  consumeRememberMeToken(token, function(err, uid) {
    if (err) {
      return done(err);
    }
    if (!uid) {
      return done(null, false);
    }
    db.selectUserById(uid, function(err, user) {
      return done(null, user);
    });
  });
}, issueToken));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.selectUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
