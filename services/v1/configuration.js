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

 				//get current theme id
 				let themes = await shopify.theme.list()
 				let themeId = ""
 				for (var i = 0; i < themes.length; i++) {
 					let theme = themes[i]
 					if(theme.role!=undefined && theme.role == 'main'){
 						themeId = theme.id
 					}
 				}

 				//add snipet to the theme
 				let snipet = '{% if order.cancelled_at == null %} <button class="cancel-order btn btn--small" order-id="{{ order.id }}">Cancel Order</button>{% endif %}<div class="order-action-msg"></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script type="text/javascript" src="https://a1a2b3df7c9f.ngrok.io/assets/js/orders-app.js"></script>'
 				let snipetPayload =  {
									    "key": "snippets/aj-cancel-order-btn.liquid",
									    "value": snipet


									  }
									 
 				await shopify.asset.update(themeId, snipetPayload).then((snipet) => console.log(snipet)).catch((err) => console.error(err));

 				return true;
 
	  	} catch(err) {
	  		console.log("err",err)
		    return false
	  	}
        
        
    },


    wishlistButton: async(requestData,requestParam) => {     
        try {
        		let accessToken = await authService.getShopifyToken();
 				const shopify = new Shopify({
								  shopName: process.env.SHOPIFY_SHOP_NAME,
								  accessToken: accessToken
								});

 				//get current theme id
 				let themes = await shopify.theme.list()
 				let themeId = ""
 				for (var i = 0; i < themes.length; i++) {
 					let theme = themes[i]
 					if(theme.role!=undefined && theme.role == 'main'){
 						themeId = theme.id
 					}
 				}

 				//add snipet to the theme
 				let snipet = '<button class="wishlist-btn btn btn--small" prod-id="{{ product.id }}" customer-id="{{ customer.id }}">Wishlist</button><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script type="text/javascript" src="https://a1a2b3df7c9f.ngrok.io/assets/js/wishlist-app.js"></script>'
 				let snipetPayload =  {
									    "key": "snippets/aj-wishlist-btn.liquid",
									    "value": snipet


									  }
									 
 				await shopify.asset.update(themeId, snipetPayload).then((snipet) => console.log(snipet)).catch((err) => console.error(err));

 				return true;
 
	  	} catch(err) {
	  		console.log("err",err)
		    return false
	  	}
        
        
    },

}