var Venue = require('../models/venue');
var Seeker = require('../models/seeker');
var Request4S = require('../services/fs_request');
var Algo = require('../services/algo');
var Auth = require('../services/auth');

exports.list = function(req, res) {
	Venue.find(function(err, venues){
		if(err){
			res.send(err);
		}
		res.json(venues);
	}); 
	//res.send('lsit of venues');
}

exports.create = function(fs_id, name,  response){
	var newVenue = new Venue({
		fs_id: fs_id,
		name: name 
	});
	//console.log(newVenue);
	newVenue.save(function(err){
		if(err){
			return console.log(err);
		}
		response.json(newVenue);
	});
};

function createSeeker(user, tag, ll){
	var coords = ll.split(',');
	if(coords.length!=2){
		return null;
	}
	return new Seeker({
		created_by: user.id, 
		tag: tag,
		lat: coords[0],
		lon: coords[1]
	});
}

exports.search = function(req, res){
	var resData = {'error': null, 'seeker_id':null};
	Auth.check(req, function(user){
		if(user!=null){
			var ll = req.query.ll;
			var tag = req.query.tag;

			var seeker = createSeeker(user, tag, ll);
			seeker.save(function(err){
				if(err){
					resData['error'] = err;
				} else {
					resData['seeker_id'] = seeker.id;
					seeker.proccess();
				}
				res.json(resData);
			});
		} else {
			resData['error'] = 'invalid token';
			res.json(resData);
		}
	});
}