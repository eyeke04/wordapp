var express = require('express');
var router = express.Router();

/* GET series listing. */
router.get('/', function(req, res, next) {
  res.send('respond with series');
});

module.exports = router;