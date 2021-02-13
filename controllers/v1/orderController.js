const axios = require("axios");
const moment = require("moment");
const cookie = require('cookie');
const orders = require("../../services/v1/orders");



module.exports = {

    cancelOrder: async(req, res) => {  
    	var host = req.headers;
        let requestData = req.body
        let requestParam = req.params 
        await orders.cancelOrder(requestData,requestParam).then(async function(order) {
            res.status(200).send(order);
        }).catch((err) => {
            res.status(200).send(err);
        });       
    },
    

}