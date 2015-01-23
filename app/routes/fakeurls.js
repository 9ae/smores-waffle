 var fake = require('../controllers/fake');

module.exports = function(app){

 	app.post('/register', fake.register);

	app.get('/search', fake.search);

	app.get('/check', fake.check);

	app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};