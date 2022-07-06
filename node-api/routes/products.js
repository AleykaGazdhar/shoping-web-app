const express = require("express");
const router = express.Router();
const Products = require("../controllers/productsController.js");
router.post("/addProduct", Products.addProduct);
module.exports = router;