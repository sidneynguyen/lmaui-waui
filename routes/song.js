var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

/**
 * GET /api/song/
 * @return 50 of the most recent songs
 */
router.get('/', function(req, res, next) {
  Song.find().sort({dateCreated: -1}).limit(50).exec(function(err, songs) {
    if (err) {
      res.send(err);
    }
    res.json(songs);
  });
});

/**
 * POST /api/song/
 * Create a new song
 * @return the new song
 */
router.post('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(400);
    res.json({
      error: 'User not logged in'
    });
    return res.redirect('/user/login');
  }
  var song = req.body;
  if (!song.title || !song.music) {
    res.status(400);
    res.json({
      error: 'Invalid data'
    });
    return;
  }
  var newSong = new Song();
  newSong.title = song.title;
  newSong.music = song.music;
  newSong.save(function(err, song) {
    if (err) {
      res.send(err);
    }
    res.json(song);
  });
});

module.exports = router;
