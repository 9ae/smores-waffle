 var venues = require('../controllers/venues');

module.exports = function(app){
	app.get('/venues', venues.list);

	app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};