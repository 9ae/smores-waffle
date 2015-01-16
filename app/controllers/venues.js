var Venue = require('../models/venue');

exports.list = function(req, res) {
	Venue.find(function(err, venues){
		if(err){
			res.send(err);
		}
		res.json(venues);
	}); 
	//res.send('lsit of venues');
}