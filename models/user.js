var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: String,
  email: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
