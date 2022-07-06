const express = require("express");
const router = express.Router();
const Products = require("../controllers/productsController.js");
router.post("/addProduct", Products.addProduct);
router.get("/getProductsList", Products.getProductsList);
module.exports = router;