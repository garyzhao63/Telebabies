
/*
 * GET settings page.
 */

exports.view = function(req, res) {
	res.render('settings', {
		image: '/images/switchoff.png', 
		link: '/routine'
	}); 
}
