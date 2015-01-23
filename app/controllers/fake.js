/* fake controller */
var MockEnv = {
	testApp : {'aii':'abc', 'auth_token':'123'},
	seekerId : 'hpdm',

	register : function(req, res){
		res.json({'aii': MockEnv.testApp.aii, 'auth_token': MockEnv.testApp.auth_token});
	},

	search: function(req, res){
		var resData = {'error': null, 'seeker_id':null};
		var ll = req.query.ll;
		var tag = req.query.tag;
		if(req.query['aii']!=MockEnv.testApp.aii || req.query['auth_token']!=MockEnv.testApp.auth_token){
			resData['error'] = 'invalid token';
		} 
		else if(tag==null){
			resData['error'] = 'Missing tag';
		}
		else if(ll==null){
			resData['error'] = 'Missing ll';
		}
		else {
			resData['seeker_id'] = MockEnv.seekerId;
			console.log(resData['seeker_id']);
		}
		res.json(resData);
	},

	check : function(req, res){

	}
}

exports.search = MockEnv.search;
exports.check = MockEnv.check;
exports.register = MockEnv.register;