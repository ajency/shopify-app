const axios = require('axios');
const moment = require("moment");
const Shopify = require('shopify-api-node');
const models = require("../../models");

module.exports = {

	wishlistProduct: async(requestData,requestParam) => {     
        try {
        		let customerId = requestData.customer_id
        		let productId = requestData.product_id
        		let wishlisted = (requestData.is_wishlisted == 1) ? true :false

        		let wishlistProduct = await models.wishlist_product.findOne({ where: {shopify_customer_id:customerId,shopify_product_id:productId } })
        		if(wishlistProduct!=null){
        			 await models.wishlist_product.update({is_wishlisted:wishlisted}, { where: {  id: wishlistProduct.id } })
        		}
        		else{
        			let storePayload = {
		                shopify_customer_id:customerId,
		                shopify_product_id: productId,
		                is_wishlisted: wishlisted
		            }
		            await models.wishlist_product.create(storePayload)
        		}

        		return true;

			 
	  	} catch(err) {
	  		console.log("err",err)
		    return false
	  	}
        
        
    },


    getWishlistProduct: async(requestData,requestParam) => {     
        try {
        		let customerId = requestData.customer_id
        		let productId = requestData.product_id
        		let wishlistProduct = await models.wishlist_product.findOne({ where: {shopify_customer_id:customerId,shopify_product_id:productId } })
        		let wishlisted = (wishlistProduct!=null) ?  wishlistProduct.is_wishlisted :false
        		 
        		let response = {
        			'code':200,
        			"success":true,
        			'wishlist':wishlisted
        		}
        		return response;

			 
	  	} catch(err) {
	  		console.log("err",err)
		    return false
	  	}
        
        
    },

}