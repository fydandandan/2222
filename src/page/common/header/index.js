'use strict'

require('./index.css');

var _mm = require('util/mm.js');

var header = {
	init: function(){
		this.bindEvent()
	},
	//定义绑定事件
	bindEvent:function(){
		var _this = this;
		//点击搜索按钮的时候做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		})
		//输入回车时做搜索提交
		$('.search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	//加载方法
	onLoad: function(){
		//关键字回填
		var keyword =  _mm.getUrlParam('keyword');
		//如果keyword存在，则回填至输入框
		if (keyword) {
			//在输入框中显示当前搜索的词汇keyword
			$('.search-input').val(keyword);
		}
	},
	searchSubmit: function(){
		var keyword = $.trim($('#search-btn').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
			
		}else{
			//如果Keyword为空则跳转首页
			_mm.goHome();
		}
	}
}

header.init();
