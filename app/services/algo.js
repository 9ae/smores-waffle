var Venue = require('../models/venue');
var Picture = require('../models/picture');

var Request4S = require('../services/fs_request');
var RequestImagga = require('../services/imagga_request');

function processPhoto(fsPhotoJson, venue_id){
	var img_url =  fsPhotoJson.prefix+'original'+fsPhotoJson.suffix;
	console.log(img_url);
	
	var picture = new Picture({
		fs_id: fsPhotoJson.i,
		prefix: fsPhotoJson.prefix,
		suffix: fsPhotoJson.suffix,
		venue_id: venue_id
	});

	RequestImagga.tag(img_url, function(d){
			var tags = d.tags.filter(function(e){
				return e.confidence > 15.0;
			});
			for(var i=0; i<tags.length; i++){
				picture.tags.push({
					name: tags[i].tag,
					confidence: tags[i].confidence
				});
				//if tag add to request result stack
			} 
		picture.usable = true;
		picture.save();
	});
	
}

function requestPhotos(venue){
	Request4S.get('venues/'+venue.fs_id+'/photos',null, function(d){
		console.log(d);
		var photos = d.response.photos.items;
		for(var i=0; i<photos.length; i++){
			processPhoto(photos[i], venue.id);
		}
	});
}

function proccessNewVenue(json){
	var newVenue = new Venue({
		fs_id: json.id,
		name: json.name,
		lat: json.location.lat,
		lon: json.location.lng
	});
	newVenue.save(function(err){
		if(err){
			return console.log(err);
		}
		requestPhotos(newVenue);
	});
}

exports.do = function handleVenuesList(venues, tag){
	matchedImages = [];

	var QueryVenue = function(json){
		this.json = json;
	};

	QueryVenue.prototype.find = function(){
		var json = this.json;
		Venue.findOne({'fs_id':this.fs_id}, function(err, vEntry){
			if (err){
				console.log(err);
				return;
			} 
			if( vEntry===null){
				proccessNewVenue(json);
				return;
			}

			img = vEntry.matchBestImage(tag);
			if (img!=null){
				// add to result list
				matchedImages.push(img)
				console.log(img.fs_id);
			}
			else { // flag venue for update job
				vEntry.updateImages = true;
				vEntry.save();
			}
		});
	};


	// get proccessed venues by server
	for(var i=0; i<venues.length; i++){
		//Does venue exist
		var v = new QueryVenue(venues[i]);
		v.find();
	}

	return matchedImages;
};
