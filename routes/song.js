/**
 * Filename: song.js
 * Authors: Sidney Nguyen
 * Date Created: March 22, 2017
 */

//
// DEPENDENCIES
//
var express = require('express');
var router = express.Router();
var db = require('../databases/MongooseAdapter');

//
// ROUTES
//

/**
 * GET /api/song/
 * Send JSON of 50 of the most recent public songs.
 */
router.get('/', function(req, res, next) {
  db.selectNSongs(50, function(err, songs) {
    if (err) {
      res.send(err);
    }
    res.json(songs);
  });
});

/**
 * GET /api/song/:id/
 * Send JSON of song with id.
 */
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
 * Validate and store song in database.
 * Send JSON of newly created song.
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
