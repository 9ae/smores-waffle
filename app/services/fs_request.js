var https = require('https');
var conf = require('../../config/api_keys')['foursquare'];

var foursquareGetRequest = function(path, params, callback){
	var url = '/v2/'+path;
	url+= '?v='+conf['api_version'];
	url+= '&client_id='+conf['client_id'];
	url+= '&client_secret='+conf['secret'];
	// for testing only
	if(params!=null){
		url+= '&'+params;
	}

	var options = {
		host : conf['hostname'],
		port: 443, 
		path: url,
		method: 'GET'
	};

	console.log(url);

	var req = https.request(options, function(res){
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

};

exports.get = foursquareGetRequest;
