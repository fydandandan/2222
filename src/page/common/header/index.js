'use strict'

require('./index.css');

var _mm = require('util/mm.js');

//通用页面头部
var header = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	//绑定事件的方法
	bindEvent: function(){
		var _this = this;
		//点击【搜索按钮】的时候做搜索提交
		$('.search-btn').click(function(){
			//搜索提交
			_this.searchSubmit();
		})
		//输入【回车】的时候做搜索提交   e表示event 时间对象
		$('.search-input').keyup(function(e){
			//如果按下的是回车键      【键码】
			if(e.keyCode == 13){
				_this.searchSubmit();
			}
		})
	},
	//加载方法
	onLoad:function(){
		//关键字回填效果
		var  keyword = _mm.getUrlParam('keyword');
		//如果keyword存在，则回填至输入框
		if (keyword){
			//在输入框中显示当前搜索得词汇keyword
			$('.search-input').val(keyword);
		}
	},
	//实现搜索提交方法
	searchSubmit:function(){
		//对关键字去空白字符进行处理
		var keyword = $.trim($('#search-btn').val());
		//如果提交搜索得时候有keyword，跳转到list页
		if (keyword){
			window.location.href = './list.html?keyword =' + keyword;
		}else{
			//如果keyword为空，直接返回首页
			_mm.goHome();	
		}
	}
}

header.init();
