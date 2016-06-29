var express = require('express');
var router = express.Router();
var db = require('../model/db');

var cat = db.ref('cat');

/* list all categories. */
router.get('/', function(req, res, next) {
	cat.on("value", function(snapshot){
		res.format({
			//html response will render the index.jade file in views/cat
			html: function () {
				res.render('cat/index', {
					title: 'All Categories',
					'cat': snapshot.val()
				})
			},
			//JSON response will show all blobs in JSON format
			json: function() {
				res.json(snapshot.val());
			}
		});
		console.log(snapshot.val());

	}, function(errorObject) {
		console.log(errorObject);
	});

});

module.exports = router;