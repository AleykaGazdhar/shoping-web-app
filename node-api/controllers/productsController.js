const Products = require("../models/productsModel.js");

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
