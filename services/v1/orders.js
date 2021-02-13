const axios = require('axios');
const moment = require("moment");
const Shopify = require('shopify-api-node');

const authService = require("./authService");

module.exports = {

	cancelOrder: async(requestData,requestParam) => {     
        try {

        		let accessToken = await authService.getShopifyToken();
 				const shopify = new Shopify({
								  shopName: process.env.SHOPIFY_SHOP_NAME,
								  accessToken: accessToken
								});

 				let cancelOrderId = requestData.order_id
 				//get current theme id
 				let cancelOrder = await shopify.order.cancel(cancelOrderId)
 				return cancelOrder;

			 
	  	} catch(err) {
	  		console.log("err",err)
		    return false
	  	}
        
        
    },

}