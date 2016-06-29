var express = require('express');
var router = express.Router();
var db = require('../model/db');

var clips = db.ref('clips');

/* list all clips. */
router.get('/', function(req, res, next) {
	clips.on("value", function(snapshot){
		res.format({
			//html response will render the index.jade file in views/clips
			html: function () {
				res.render('clips/index', {
					title: 'All Clips',
					'clips': snapshot.val()
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