var express = require('express');
var mongoose = require('mongoose');

module.exports = {
  User: {},
  Song: {},
  connect: function() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/lmauiwaui');
    require('../models/song');
    require('../models/user');
    require('../models/token');
    User = mongoose.model('User');
    Song = mongoose.model('Song');
    Token = mongoose.model('Token');
  },
  
  insertUser: function(user, callback) {
    var newUser = new User(user);
    newUser.save(user, callback);
  },

  selectUserByUsername: function(username, callback) {
    User.findOne({username: username}, callback);
  },

  selectUserById: function(id, callback) {
    User.findOne({_id: id}, callback);
  },

  selectTokenByToken: function(token, callback) {
    Token.find({token: token}, callback);
  },

  deleteTokenByToken: function(token, callback) {
    Token.remove({token: token}, callback);
  },

  insertToken: function(token, callback) {
    var newToken = new Token(token);
    newToken.save(callback);
  },

  selectNSongs: function(n, callback) {
    Song.find({privacy: 'public'}).sort({dateCreated: -1}).limit(n).exec(callback);
  },

  selectSongById: function(id, callback) {
    Song.findOne({_id: id}, callback);
  },

  insertSong: function(song, callback) {
    var newSong = new Song(song);
    newSong.save(callback);
  },

  selectSongsByUid: function(uid, callback) {
    Song.find({uid: uid}, callback);
  }
};