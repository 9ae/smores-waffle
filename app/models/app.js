var mongoose = require('mongoose');

var AppSchema = new mongoose.Schema({
	aii: String,
	auth_token: String
});

module.exports = mongoose.model('App', AppSchema);

