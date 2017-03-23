var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
  title: String,
  melody: String,
  chords: String,
  privacy: String,
  createdBy: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Song', songSchema);
