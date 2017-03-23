var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
  token: String,
  uid: String
});

mongoose.model('Token', tokenSchema);