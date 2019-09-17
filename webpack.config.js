var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function(name){
	return {
			template:'./src/view/' + name + '.html',
			filename:'view/' + name + '.html',
			inject:true,
			hash:true,
			chunks:['common',name]
	}
}
var config = {
	entry:{
	'common' : ['./src/page/common/index.js'],
	'index' : ['./src/page/index/index.js'],
	'user-login': ['./src/page/user-login/index.js']
    },
output:{
	path: path.resolve(__dirname,'dist'),
	publicPath:'/dist',
	filename:'js/[name].js'
	},

	externals:{
		'jquery' : 'window.jQuery'
	},
	/*optimization:{
		splitChunks: {
  //缓存组
  cacheGroups: {
    //commons表示公共的模块
    commons: {
        //即会生成独立通用模块base.js文件(位置以output为准)
        name: "base",
        //chunks属性用来选择分割哪些代码块，可选值有：'all'（所有代码块），
        //'async'（按需加载的代码块），'initial'（初始化代码块）
        chunks: "initial",
        //最小2个文件有公共内容才提取
        minChunks: 2,
        //SplitChunksPlugin默认地只会分离大于30Kb的文件
        //我们的公共文件并没有大于30Kb，所以改为0之后就完美了
        minSize: 0
    }
  }
}
	}*/
	module:{
		rules:
		[
		{
			 test: /\.css$/, 
    		 loader: ExtractTextPlugin.extract({
	     		 fallback: "style-loader",
	     		 use: "css-loader"
			})
		},
		{
			 test: /\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/, 
    		 loader:'url-loader?limit=100&name=resource/[name].[ext]'
		}
		]
	},
	plugins:[
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login'))
	]
}
//如果是开发环境添加一个数组元素
if ('dev ===WEBPACK_ENV') {
	config.entry.common.push('webpack-dev-server/client?http://loacalhost:8088');
}

module.exports = config;
