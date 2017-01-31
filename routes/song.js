var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

router.get('/', function(req, res, next) {
  Song.find(function(err, songs) {
    if (err) {
      res.send(err);
    }
    res.json(songs);
  });
});

router.post('/', function(req, res, next) {
  var song = req.body;
  console.log(song);
  if (!song.title || !song.music) {
    res.status(400);
    res.json({
      error: 'Invalid data'
    });
  } else {
    var newSong = new Song();
    newSong.title = song.title;
    newSong.music = song.music;
    newSong.save(function(err, song) {
      if (err) {
        res.send(err);
      }
      res.json(song);
    });
  }
});

module.exports = router;
