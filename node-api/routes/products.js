const express = require("express");
const router = express.Router();
const Products = require("../controllers/productsController.js");
router.post("/addProduct", Products.addProduct);
router.post("/getProductsList", Products.getProductsList);
router.post("/deleteProduct", Products.deleteProduct);
module.exports = router;