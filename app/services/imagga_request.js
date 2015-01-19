var http = require('http');
var conf = require('../../config/api_keys')['imagga'];

var tagRequest = function(image_url, callback){
	var url = '/draft/tags';
		url+= '?api_key='+conf['api_key'];
		url+= '&api_secret='+conf['api_secret'];
		url += '&url='+image_url;

	var options = {
		host : 'api.imagga.com',
		path: url,
		method: 'GET'
	};

	console.log(url);

	var req = http.request(options, function(res){
		console.log("Got response: " + res.statusCode);
  		console.log("headers: ", res.headers);
  		res.setEncoding('utf8');

		var bodyChunks = [];
		res.on('data', function(d){
			bodyChunks.push(d);
		}).on('end', function(){
			var body = bodyChunks.join('');
			var jsonBody = JSON.parse(body);
			callback(jsonBody);
		});;
	});

	req.end();

	req.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});	
}

exports.tag = tagRequest;