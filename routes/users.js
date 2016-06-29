var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user_faves, user_plans and user_info');
});

module.exports = router;
