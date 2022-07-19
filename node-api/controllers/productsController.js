const Products = require("../models/productsModel.js");
const orders = require("../models/oderModel");
const globalService = require("../core/globalService");
const stripe = require('stripe')('sk_test_51K1TCTSFdV4WOpwUdvC1Y6kCT5yyG541r2oBFUNAAhbiT4a8J59miUt2kw2rjJaXc4blZkbmhBikNXtTivTrLCkk00jnaQOoWT');

require("dotenv").config();
var Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

exports.razorPayCreateOrder = (req, res) => {
  var orderInfo = req.body;
  console.log("orderInfo======", orderInfo);

  var options = {
    amount: orderInfo.amount.toString().search(/\./)
      ? (orderInfo.amount = (orderInfo.amount + "").replace(".", ""))
      : (orderInfo.amount = orderInfo.amount + "00"),
    currency: "INR",
    receipt: Date.now(),
    payment_capture: 0,
  };

  // return;
  instance.orders.create(options, (err, order) => {
    if (err) {
      return res.json({
        status: 500,
        message: "There are some error while creating order.",
        data: err,
      });
    } else {
      return res.json({
        status: 200,
        message: "Now Just order was created.",
        order: order,
        razor_key_id: process.env.RAZOR_KEY_ID,
      });
    }
  });
};

exports.razorPayOrdayPayment = (req, res) => {
  postData = req.body;
  let ordersData = new orders();
  Object.keys(postData).forEach((key) => {
    ordersData[key] = postData[key];
  });

  // return;
  postData.amount = toString(postData.amount).search(/\./)
    ? (postData.amount = (postData.amount + "").replace(".", ""))
    : (postData.amount = postData.amount + "00");

  instance.payments.capture(
    postData.razorpayPaymentId,
    postData.amount,
    "INR",
    (razorErr, razorCaptureRes) => {
      if (razorErr) {
        return res.json({
          status: 500,
          message: "There are in some error while Capture the payment!.",
          data: razorErr,
        });
      } else {
        // ordersData.paymentStatus = process.env.STATUS_CAPTURED;
        ordersData.save((paymentErr, paymentData) => {
          if (paymentErr) {
            return res.json({
              status: 500,
              message: "There are in some error while save Payment!.",
              data: paymentErr,
            });
          } else {
            return res.json({
              status: 200,
              message: "Payment has been succesfully.",
              data: paymentData,
            });
          }
        });
      }
    }
  );
};


exports.addProduct = async (req,res) => {
  const productData = req.body;
  console.log("productData:", productData)

  if (productData._id) {
    productData.updateAt = new Date();

    Products.updateOne({
      _id: productData._id,
    },
    productData,
    (err, resp) => {
      if (err) {
        return res.json({
          status: 500, 
          message: "There are some errror while update.",
          data: err,
        });
      } else {
        return res.json({
          status: 200,
          message: "Your Data has been updated Successfully.",
          data: productData,
        });
      }
    });
  } else {
    delete productData._id;
    Products.create(productData, (productError, productRes)=>{
      console.log("productError========", productError);
      
      if (productError) {
        return res.json({
          status: 500, 
          message: "There are some errror while saving product.",
          data: productError,
        });
      } else {
        return res.json({
          status: 200,
          message: "Your Product has been saved Successfully.",
          data: productRes,
        });
      }
    }) 
  
  }
};

exports.getProductsList = async(req,res) => {
  console.log(req.body)
  let whereObj = req.body
  try {
    const data = await Products.find(whereObj);
    return res.json({
      status: 200,
      message: "Get the Product successfully.",
      data: data,
    });
  } catch(error) {
    return res.json({
      status: 500,
      message: "Some Error occured.",
      data: error,
    });
  }
};
exports.getOrderList = async(req,res) => {
  console.log(req.body)
  let whereObj = req.body
  try {
    const data = await orders.find(whereObj);
    return res.json({
      status: 200,
      message: "Get the Product successfully.",
      data: data,
    });
  } catch(error) {
    return res.json({
      status: 500,
      message: "Some Error occured.",
      data: error,
    });
  }
};

exports.deleteProduct = async(req,res) => {
  const deletedata = req.body;
  Products.deleteOne({_id : deletedata._id},  (Deleteerr, deleteResp)=> {
    if (Deleteerr) {
      return res.json({
        status: 500, 
        message: "There are some errror while deleting product.",
        data: Deleteerr,
      });
    } else {
      return res.json({
        status: 200,
        message: "Your Product has been deleted Successfully.",
        data: deleteResp,
      });
    }

  })
};

exports.searchProductData = (req, res) => {
  var postProductData = req.body;
  Products.find({
      $or: [{
        productname: {
            $regex: new RegExp(
              ".*" + postProductData.productSearch.toLowerCase() + ".*",
              "i"
            ),
          },
        },
        {
          Productdescription: {
            $regex: new RegExp(
              ".*" + postProductData.productSearch.toLowerCase() + ".*",
              "i"
            ),
          },
        },
      ],
    },
    (err, data) => {
      if (data === null) {
        return res.json({
          status: 500,
          message: "There are some error while getting Product Information.",
          data: err,
        });
      } else {
        if (data.length) {
          return res.json({
            status: 200,
            message: "Getting Product data successfully.",
            data: data,
          });
        } else {
          return res.json({
            status: 500,
            message: "No Product Data Found.",
            data: data,
          });
        }
      }
    }
  );
};
