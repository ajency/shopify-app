/** Express initialization */
const express = require("express");
const router = express.Router();
const passport = require("passport");


/** Controllers */
const defaultController = require("../../controllers/defaultController");
const configurationController = require("../../controllers/v1/configurationController");
const orderController = require("../../controllers/v1/orderController");
const productController = require("../../controllers/v1/productController");
 

/** Routes */
router.post('/shopify/configure-cancel-order', configurationController.cancelOrder);
router.post('/shopify/configure-wishlist', configurationController.wishlistButton);
router.post('/shopify/cancel-order', orderController.cancelOrder);

router.post('/shopify/wishlist-product', productController.wishlistProduct);
router.post('/shopify/get-wishlist-product', productController.getWishlistProduct);






/** Middleware */
const excludeRoutes = [
]
// 	"/api/v1/plans",

router.use(function (req, res, next) {
  	next()
})

module.exports = router; 
