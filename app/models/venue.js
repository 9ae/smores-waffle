var mongoose = require('mongoose');
var db = require('../../config/db');
mongoose.connect(db.url);

var VenueSchema = new mongoose.Schema({
	fs_id: String,
	name: String,
	tags: {type: [String], index:true}
});

module.exports = mongoose.model('Venue', VenueSchema);