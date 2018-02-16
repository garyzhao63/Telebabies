
/*
 * GET settings page.
 */
var data = require('../user.json');

exports.view = function(req, res) {
	console.log(data.rickord123[1]); 
	res.render('result-history', data.rickord123[1]); 
}
