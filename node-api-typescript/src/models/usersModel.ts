import mongoose from 'mongoose';

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
  role: {
    type: String
  },
  status: {
    type: Number
  },
  }, {
  timestamps: true,
  collection: 'users'
});

export default mongoose.model('users', Users);