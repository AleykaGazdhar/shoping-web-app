var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items

var Users = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    required: true,
  },
  dob: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1,
    required: true
  },
  shoppingPreference: Any,
  forgotToken: String,
  forgotStatus: Any,
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('users', Users);