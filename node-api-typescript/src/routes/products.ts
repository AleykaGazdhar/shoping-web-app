import Products from '../controllers/productsController';
import { Router } from 'express';
const productRouter = Router();

productRouter.post("/addProduct", Products.addProduct);
productRouter.post("/getProductsList", Products.getProductsList);
productRouter.post("/deleteProduct", Products.deleteProduct);
productRouter.post('/searchProductData', Products.searchProductData);
productRouter.post("/razorPayCreateOrder", Products.razorPayCreateOrder);
productRouter.post('/razorPayOrdayPayment', Products.razorPayOrdayPayment);
productRouter.post('/getOrderList', Products.getOrderList);

export default productRouter