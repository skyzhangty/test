/*eslint-disable*/
module.exports = function(env) {
	if(env==='prod' || env==='test') {
		return require('./webpack.deploy');
	} 
	return require('./webpack.local');	
};