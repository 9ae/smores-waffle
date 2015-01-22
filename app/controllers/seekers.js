var Seeker = require('../models/seeker');
var Auth = require('../services/auth');

exports.check = function(req, res) {
	var id = req.query.id;
	var resData = {'error': null, 'seeker':null};
	Auth.check(req, function(user){
		if(user!=null){
			Seeker.findOne({_id:id, created_by: user.id}, function(err, seeker){
				if(err){
					resData['error'] = err;
				} else if(seeker==null){
					resData['error'] = 'Seeker not found';
				} else{
					resData['seeker'] = seeker;
				}
				res.json(resData);
			});
		} else {
			resData['error'] = 'invalid token';
			res.json(resData);
		}
	});
};