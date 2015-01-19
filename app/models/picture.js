var mongoose = require('mongoose');

var pictureTagSchema = new mongoose.Schema({
	name: String,
	confidence: Number
});

var pictureSchema = new mongoose.Schema({
	fs_id: String,
	prefix: String,
	suffix: String,
	usable: Boolean,
	venue_id: mongoose.Schema.Types.ObjectId,
	tags: {type: [pictureTagSchema], index:true}
});

module.exports = mongoose.model('Picture', pictureSchema);