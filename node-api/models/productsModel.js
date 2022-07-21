var mongoose = require('mongoose');
var schema = mongoose.schema;
var Any = mongoose.Schema.Types.Mixed;

var Products = new mongoose.Schema({
  productname: {
    type: String,
    trim: true,
    unique: true
  },
  productprice: {
    type: String,
    trim: true,
    required: true
  },
  productmargin: {
    type: Number,
    trim: true,
    required: true
  },
  Productdescription: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  productImg: Any
}, {
  timestamps: true,
  collection: 'products'
});

module.exports = mongoose.model('products', Products);