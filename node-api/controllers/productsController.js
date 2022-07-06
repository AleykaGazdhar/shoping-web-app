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
    Products.create(productData, (productError, productRes)=>{
      console
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
}

exports.getProductsList = async(req,res) => {
  console.log('test============')
  try {
    const data = await Products.find();
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