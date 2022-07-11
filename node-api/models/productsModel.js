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
    trim: true
  },
  productmargin: {
    type: String,
    trim: true
  },
  Productdescription: {
    type: String,
    trim: true
  },
  status: {
    type: Number
  },
  productImg: Any
}, {
  timestamps: true,
  collection: 'products'
});

module.exports = mongoose.model('products', Products);