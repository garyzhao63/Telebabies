
/*
 * GET settings page.
 */

exports.view = function(req, res) {
	//result['link'] = 'index'; 
	//res.render('result', result); 
	res.render('result', {"link": "index"}); 
}
exports.view2 = function(req, res) {
	//result['link'] = 'result-history'; 
	//res.render('result', result); 
	res.render('result', {"link": "result-history"}); 
}
