var express = require('express');
var mongoose = require('mongoose');
require('../models/song');
require('../models/user');
var User = mongoose.model('User');
var Song = mongoose.model('Song');

module.exports = {
  connect: function() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/lmauiwaui');
  },
  
  insertUser: function(user, callback) {
    user.save(user, callback(err, user));
  },

  selectUserByUsername: function(username, callback) {
    User.findOne({username: username}, callback(err, user));
  },

  selectUserById: function(id, callback) {
    User.findOne({_id: id}, callback(err, user));
  },

  selectNSongs: function(n, callback) {
    Song.find().sort({dateCreated: -1}).limit(n).exec(function(err, songs) {
      callback(err, songs);
    });
  },

  selectSongById: function(id, callback) {
    Song.findOne({_id: id}, callback(err, song));
  },

  insertSong: function(song, callback) {
    song.save(callback);
  }
};