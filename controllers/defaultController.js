const models = require("../models");

module.exports = {
    default: (req, res) => {
        /** TODO: Remove this function */
        console.log(req.body);
        res.status(200).send("Root");
    }
}