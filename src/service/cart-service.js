'user strict'

var _mm = require('util/mm.js');

var _cart = {
	getCartCount: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error:reject
		})
	}
	
}

module.exports = _cart;