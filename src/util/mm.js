'use strict'
var Hogan = require('hogan.js')

var conf = {
	serverHost : ''
}
//$ <==> jquery  这里的ajax方法是jquery自带的方法
var _mm = {
	//数据请求的方法
	request : function(param){
		//保存this，防止this指针指向不明
	var _this = this;
		$.ajax({
			type         : param.method   ||'get',
			url          : param.url      ||'',
			dataType     : param.type     ||'json',
			data         : param.data     ||'',
			 //请求成功 返回200
			success      : function(res){
				//请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}else if (10 ===res.status) {
					//没有登录状态，统一去登陆
					_this.doLogin();
				}else if (1 ===res.status) {
					//报错
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			//返回404 503
			error        : function(err){
			   typeof param.error === 'function' && param.Error(err.statusText);	
			}
		});
	},
	//统一跳转到登录界面
	doLogin: function(){
		window.location.href = './user-login.html?redirect=' + 
		encodeURIComponent(window.location.href);
	},
	//获取服务器地址
	getServerUrl: function(path){
		return conf.serverHost + path
	},
	//获取url参数
	getUrlParam: function(name){
		var reg      = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result   = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染HTML模板函数
	renderHtml: function(htmlTemplate, data){
		//Hogan模板编译
		var template = Hogan.compile(htmlTemplate);
		//渲染模板
		var result = template.render(data);
		//将渲染的结果返回
		return result;
	},
	//成功提示
	successTips: function(msg){
		alert(msg || '操作成功')
	},
	//错误提示
	errorTips: function(msg){
		alert(msg || '哪里不对了!');
	},
	//字段的验证，支持非空，邮箱，手机的判断
	validate: function(vlue,type){
		var value = $.trim(value);
		//非空验证
		if ('require' ===type){
			//将value值强转成Boolean类型的数据
			return !!value;
		}
		//手机号验证
		if ('phone' === type) {
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		if ('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//跳回主页
	goHome :function(){
     window.location.href = './index.html';
    }
};
module.exports = _mm;

