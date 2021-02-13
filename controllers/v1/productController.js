const axios = require("axios");
const moment = require("moment");
const cookie = require('cookie');
const product = require("../../services/v1/product");



module.exports = {

    wishlistProduct: async(req, res) => {  
    	var host = req.headers;
        let requestData = req.body
        let requestParam = req.params 
        await product.wishlistProduct(requestData,requestParam).then(async function(order) {
            res.status(200).send(order);
        }).catch((err) => {
            res.status(200).send(err);
        });       
    },

    getWishlistProduct: async(req, res) => {  
        var host = req.headers;
        let requestData = req.body
        let requestParam = req.params 
        await product.getWishlistProduct(requestData,requestParam).then(async function(order) {
            res.status(200).send(order);
        }).catch((err) => {
            res.status(200).send(err);
        });       
    },
    

}