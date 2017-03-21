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
    User = mongoose.model('User');
    Song = mongoose.model('Song');
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

  selectSongsAsUser: function(req, callback) {
    if (req.isAuthenticated()) {
      Song.find({uid: req.user._id}, callback)
    } else {
      callback({
        err: 'User is not authenticated'
      }, null);
    }
  }
};