var express = require('express');
var router = express.Router();
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
    if (song.privacy !== 'public') {
      if (!req.isAuthenticated()) {
        return res.json({
          err: 'Song is private'
        });
      }
      if (req.user._id != song.createdBy) {
        console.log(req.user._id);
        console.log(song.createdBy);
        return res.json({
          err: 'Song is private'
        });
      }
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
    return res.json({
      error: 420
    });
  }
  var song = req.body;
  if (!(song.title && song.melody && song.chords && song.privacy)) {
    res.status(400);
    res.json({
      error: 'Invalid data'
    });
    return;
  }
  var newSong = {
    title: song.title,
    melody: song.melody,
    chords: song.chords,
    privacy: song.privacy,
    uid: req.user._id
  }
  db.insertSong(newSong, function(err, song) {
    if (err) {
      res.send(err);
    }
    res.json(song);
  });
});

module.exports = router;
