var App = require('../models/app');

var Auth = {
	check: function(req, callback){
		var aii, auth_token;
		if(req.method=='GET' || req.method=='DELETE'){
			aii = req.query.aii;
			auth_token = req.query.auth_token;
		}
		else {
			aii = req.body['aii'];
			auth_token = req.body['auth_token'];
		}
		App.findOne({aii: aii, auth_token: auth_token}, function(err, user){
			if(err){
				callback(null);
			}
			else{
				callback(user);
			}
		});

	}
};

module.exports = Auth;