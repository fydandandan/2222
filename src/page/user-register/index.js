'use strict'

require('./index.css');
require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');


//错误提示的对象
var formError = {
	show: function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide:function(){
		$('.error-item').hide().find('.err-msg').text();
	}
}

var page = {
	init: function () {
		this.bindEvent()
	},
	//绑定事件的函数
	bindEvent: function(){
		var _this = this
		//登录按钮的点击
		$('#submit').click(function(){
			console.log('XXXX')
			_this.submit();
		})
		//
	},
	//提交表单的函数
	submit: function(){
		var _this = this
		//从表单获取数据
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		//表单验证结果
		var validateResult = _this.formValiDate(formData);
		if (validateResult.status) {
			console.log("表单验证成功，继续服务端验证...");
			//提交数据到服务器
			_user.login(formData, function(){
				//对decodeURLComponent编码的字符串进行解码
				window.location.href = decodeURIComponent(_mm.getUrlParam('redirect'))||'./index.html'
//				window.location.href = './index.html'
			}, function(errMsg){
				//错误提示
				formError.show(errMsg);
			});
		}else{
			//前端验证失败
			formError.show(validateResult.msg);
		}
},
		//[前端]表单验证函数的开发
		formValiDate: function(formData){
			var result = {
				//空对象
				status: false,
				msg:''
			};
			//验证用户名
			if (!_mm.validate(formData.username,'require')) {
				result.msg = '用户名不能为空';
				return result
			}
			//验证密码
			if (!_mm.validate(formData.password,'require')) {
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
