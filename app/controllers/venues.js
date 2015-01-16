var Venue = require('../models/venue');
var Request4S = require('../services/fs_request');

exports.list = function(req, res) {
	Venue.find(function(err, venues){
		if(err){
			res.send(err);
		}
		res.json(venues);
	}); 
	//res.send('lsit of venues');
}

exports.create = function(fs_id, name, tags, response){
	var newVenue = new Venue({
		fs_id: fs_id,
		name: name ,
		tags: tags
	});
	//console.log(newVenue);
	newVenue.save(function(err){
		if(err){
			return console.log(err);
		}
		response.json(newVenue);
	});
};

exports.search = function(req, res){
	var ll = req.query.ll;
	var tag = req.query.tag;

	Request4S.get('venues/search','ll='+ll+'&query='+tag, function(d){
		var response = d.response;
		var venuesCount = d.response.venues.length;
		console.log(venuesCount+' results found');
		
	});


	res.json({'LatLong':ll, 'tag': tag});
}