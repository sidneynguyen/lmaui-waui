var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
  title: String,
  music: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Song', songSchema);
