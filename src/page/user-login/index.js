'use strict'

require('./index.css');
require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var page = {
	init: function () {
		this.bindEvent()
	},
	//绑定事件的函数
	bindEvent: function(){
		var _this = this
		//登录按钮的点击
		$('#submit').click(function(){
			_this.submit();
		})
		//
	},
	//提交表单的函数
	sumbmit: function(){
		//从表单获取数据
		var formData = {
			username: $.strim(('#username').val()),
			password: $.strim(('#password').val())
		};
		//表单验证结果
		},
		//表单验证函数的开发
		formValiDate: function(){
			var result = {
				//空对象
				status: false,
				msg:''
			};
			//验证用户名
			if (!_mm.validate(FormData.usernamem,'require')) {
				result.msg = '用户名不能为空';
				return result
			}
			//验证密码
			if (!_mm.validate(FormData.password,'require')) {
				result.msg = '密码不能为空';
				return result
			}
			//如果通过验证，则返回正确的提示
			result.status = true;
			result.msg = '验证通过'
			//返回结果对象
			return result;
		}
	
};
 $(function(){
 	page.init();
 });
