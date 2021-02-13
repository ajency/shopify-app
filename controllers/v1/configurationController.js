const axios = require("axios");
const moment = require("moment");
const cookie = require('cookie');
const configuration = require("../../services/v1/configuration");



module.exports = {

    cancelOrder: async(req, res) => {     
    	var host = req.headers;
        let requestData = req.body
        let requestParam = req.params 
        await configuration.cancelOrder(requestData,requestParam).then(async function(config) {
            res.status(200).send(config);
        }).catch((err) => {
            res.status(200).send(err);
        });       
    },

    wishlistButton: async(req, res) => {     
    	var host = req.headers;
        let requestData = req.body
        let requestParam = req.params 
        await configuration.wishlistButton(requestData,requestParam).then(async function(config) {
            res.status(200).send(config);
        }).catch((err) => {
            res.status(200).send(err);
        });       
    },
    

}