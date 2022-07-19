var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;

var orders = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: { 
      type: String, 
      required: true
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    userId: Any,
    productDetails: Any,
    quantity: Any
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

module.exports = mongoose.model('orders', orders);