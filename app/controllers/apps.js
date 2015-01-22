var crypto = require('crypto');

var App = require('../models/app');

exports.register = function(req, res){
	var jsonBody = req.body;
	var aii = jsonBody['aii'];
	console.log(req.body);
	App.findOne({'aii':aii}, function(err, app){
		if (err){
			res.json({'error':err});
		}
		else if (app===null){
			var newApp = new App({'aii': aii});
			newApp.auth_token = crypto.randomBytes(16).toString('hex');
			newApp.save(function(err){
				var response = {'aii': aii, 'auth_token': newApp.auth_token};
				res.json(response);
			});
		}
		else {
			res.json({'error': 'Already registered'});
		}
	});
};