'use strict'

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init: function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
	},
	//绑定事件的方法
	bindEvent: function(){
		$('.js-login').click(function(){
			_mm.doLogin();
		})
		//点击注册按钮
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		})
		//点击退出按钮
		$('.js-logout').click(function(){
			_user.logout();
		})
	},
	//加载用户信息
	loadUserInfo: function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show()
			.find('.username').text(res.username)
		},function(errMsg){	
			//donothing
		});
	},
	//加载购物车数量
	loadCartCount: function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0)
		},function(errMsg){	
			$('.nav .cart-count').text(0);
		});
	}
}

module.exports = nav.init();
