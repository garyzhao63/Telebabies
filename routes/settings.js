
/*
 * GET settings page.
 */

var data = require('../user.json');

exports.view = function(req, res) {
	console.log(data.rickord123[3]);
	res.render('settings', data.rickord123[3]); 
}
