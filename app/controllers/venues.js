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