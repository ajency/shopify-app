const axios = require('axios');
const moment = require("moment");
const models = require("../../models");

module.exports = {

	createStoreToken: async(requestData) => {
		try {
			let storePayload = {
                name:requestData.name,
                email: requestData.email,
                access_token:requestData.access_token
            }
            await models.stores.create(storePayload).then(async(storeRes) => {
                return storeRes;
            }).catch((err) => {
            	console.log("errr,",err)
                return err;
            });
	  	} catch(err) {
		     return err;
	  	}
        
    },
	getShopifyToken: async() => {
		try {
			let store = await models.stores.findOne({ where: {name:process.env.SHOPIFY_SHOP_NAME } })
			return (store!=null) ? store.access_token : '';
	  	} catch(err) {
		     return err;
	  	}

         
    }



}