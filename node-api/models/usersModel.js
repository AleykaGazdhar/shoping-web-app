var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var Users = new Schema({
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  phonenumber: {
    type: String
  },
  password: {
    type: String
  },
  gender: {
    type: String
  },
  }, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('users', Users);