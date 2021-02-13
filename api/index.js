/** Express initialization */
const express = require("express");
const router = express.Router();

/** Versioned routes */
router.use("/v1", require("./v1"));
router.get('*', function(req, res){
  res.status(404).send('Not Found')
});
router.post('*', function(req, res){
  res.status(404).send('Not Found')
});

module.exports = router;