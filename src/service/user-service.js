'use strict'

var _mm = require('util/mm.js');

var _user = {
	//1、登出
	logout: function (resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//2、核对用户信息
	checkLogin: function (resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
		//1、登录   中间件
		//从客户表单form中获取userInfo,提交到服务器进行验证
		//如果验证通过则执行resolve回调函数；如果验证没通过，则执行reject回调函数
	login: function (userInfo,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	}
}

module.exports = _user;
