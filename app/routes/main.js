 var venues = require('../controllers/venues');

module.exports = function(app){
	app.get('/venues', venues.list);

	app.post('/venues', function(req, res){
		var jsonBody = req.body;
		venues.create(jsonBody['fs_id'], jsonBody['name'], jsonBody['tags'], res);
		//venues.create('a', 'argo tea', ['tea', 'macarons'], res);
	});

	app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};