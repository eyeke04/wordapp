var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

var db = require('../model/db');
var orgRef = db.ref('org');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    //look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }

}));

/* list all organisations and churches. */
router.route('/')
	.post(function (req, res) {
		//addr is an ob containing {"street","city",state","country"}
		var newOrg = orgRef.push().set({
			name: req.body.name,
			type: req.body.type,
			addr: req.body.street + ':' + req.body.city + ':' + req.body.state +':'+ req.body.country,
			web: req.body.web,
			info: req.body.info,
			facebook: req.body.facebook,
			twitter: req.body.twitter,
			img: req.body.img,
			date_entered: Date.now(),
			status: 'unconfirmed'  
		}, 
		function (error) {
			res.format({
				html: function (argument) {
					res.location("org");
					res.redirect('/org');
				},
				json: function() {
					res.json({error: true, message: 'Success', id: orgId});
				}
			});
		});
	})
	.get(function(req, res) {
		orgRef.on("value", function(snapshot){
			res.format({
				//html response will render the index.jade file in views/org
				html: function () {
					res.render('org/index', {
						title: 'All Church/Organisations',
						'orgs': snapshot.val()
					})
				},
				//JSON response will show all blobs in JSON format
				json: function() {
					res.json(snapshot.val());
				}
			});

		}, function(error) {
			console.log('errorObject');
		});

	});

router.get('/new', function(req, res) {
    res.format({
    	html: function() {
    		res.render('org/new', {
    			title: 'New Church Organisation'
    		});
    	}
    })	
});

router.param('id', function(req, res, next, id) {
  req.id = id;
  next();
});


router.route('/:id')
	.get(function (req, res) {
		var thisOrg = orgRef.child(req.id);
		console.log("First call: " + req.id);
		thisOrg.on('value', function (snapshot) {
			console.log(snapshot.val());
			res.format({
				//html response will render the index.jade file in views/org
				html: function () {
					res.render('org/org', {
						title: "Church/Org",
						'org': snapshot.val(),
						'org_id': req.id
					})
				},
				//JSON response will show all blobs in JSON format
				json: function() {
					res.json(snapshot.val());
				}
			})
		})
	});

router
	.get('/:id/edit', function (req,res) {
		thisOrg = orgRef.child(req.id);
		thisOrg.on('value', function (snapshot) {
			res.format({
	            //HTML response will render the 'edit.jade' template
	            html: function(){
	                   res.render('org/edit', {
	                      title: 'Edit Church/Organisation',
		                  'org' : snapshot.val(),
		                  'org_id': req.id
	                  });
	             },
	             //JSON response will return the JSON output
	            json: function(){
	                   res.json(snapshot.val());
	             }
	        });
		});
	})
	.put('/:id/edit', function (req, res) {
		thisOrg = orgRef.child(req.id);		
		//we send update data as json
		thisOrg.update(req.body.update_data, function (error) {
			if (error) {
				res.send({error: true, message: 'Could not save.'});
			}else{
				res.format({
					html: function() {
						res.location("org/"+ req.id);
						res.redirect("/org/"+ req.id);
					},
					//JSON responds showing updated values
					json: function(){
						res.json({error: false, message: 'Saved'});
					}
				});
			}
		}); 
	})

	.delete('/:id', function (req, res) {
		thisOrg = orgRef.child(req.id);		
		//we send update data as json
		thisOrg.remove(function (error) {
			console.log('successful!');
			if (error) {
				console.log('Something Went Wrong');
				res.send({error: true, message: 'Could not delete.'});
			}else{
				console.log('successful 2!');
				res.format({
					html: function() {
						res.location("org");
						res.redirect("/org");
					},
					//JSON response
					json: function(){
						res.json({error: false, message: 'Deleted'});
					}
				});
			}
		}); 
	})
;
module.exports = router;