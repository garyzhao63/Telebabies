
/*
 * GET settings page.
 */

var data = require('../user.json');

exports.view = function(req, res) {
	console.log(data.rickord123[0].info[0]);
	res.render('profile', data.rickord123[0].info[0]); 
}
