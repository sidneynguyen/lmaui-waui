var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//var Song = mongoose.model('Song');
var db = require('../databases/MongooseAdapter');

/**
 * GET /api/song/
 * @return 50 of the most recent songs
 */
router.get('/', function(req, res, next) {
  db.selectNSongs(50, function(err, songs) {
    if (err) {
      res.send(err);
    }
    res.json(songs);
  });
});

router.get('/:id', function(req, res, next) {
  db.selectSongById(req.params.id, function(err, song) {
    if (err) {
      res.send(err);
    }
    res.json(song);
  });
})

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
  db.insertSong(newSong, function(err, song) {
    if (err) {
      res.send(err);
    }
    res.json(song);
  });
});

module.exports = router;
