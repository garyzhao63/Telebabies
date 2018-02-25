
/*
 * GET settings page.
 */

var data = require('../user.json');

exports.view = function(req, res) {
	console.log(data);
	res.render('settings', data);
}
