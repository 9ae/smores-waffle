 var venues = require('../controllers/venues');
 var apps = require('../controllers/apps');

module.exports = function(app){
/*	app.get('/venues', venues.list);

	app.post('/venues', function(req, res){
		var jsonBody = req.body;
		venues.create(jsonBody['fs_id'], jsonBody['name'], jsonBody['tags'], res);
	}); */

 	app.post('/register', apps.register);

	app.get('/search', venues.search);

	app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};