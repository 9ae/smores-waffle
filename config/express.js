var express = require('express');
module.exports = function() {
    var app = express();
    require('../app/routes/index.server.routes.js')(app);

    app.use(express.static('./public'));
    return app;
};