//请求Nodejs提供的path模块
//path有一个方法：resolve(参数1，参数2)
//参数1：——dirname表示当前目录的路径
//参数2：需要追加的目录名，不需要写/，resolve的方法会帮我们自动



var getHtmlConfig = function(name){
	return{
		template:'./src/view/'+ name+'.html',
			//打包以后的路径和文件
			filename:'view/'+ name +'.html',
			//自动注入
			inject: true,
			//哈希值
			hash: true,
			//有哪些打包后的js文件需要被注入到html文件中
			chunks: ['common','index']

	}
}

var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.WEBPACK_ENV || 'dev';
var str = new Buffer('aHR0cDovL3Rlc3QuaGFwcHltbWFsbC5jb20v', 'base64');

var config = {
	entry:{
		'index':'./src/page/index/index.js',
		'login':'./src/page/user-login/index.js',
		'common':['./src/page/common/index.js']
	},
	output:{
		path: path.resolve(__dirname,'dist'),
		publicPath:'/dist',
		filename:'js/[name].js'
	},
	externals:
	{
		'jquery' : 'window.jquery'
	},
	/*optimization:{
		//抽取公共模块的对象
		splitChunks:{
			//缓存组
			cacheGroups:{
				//表示公共的模块
				commons:
				{
					name:'base',
					chunks:"initial",
					//最小两个文件有公共内容才提取
					minChunks:2,
					minSize:0
				}
			}
		}
	},*/
	module:{
		rules:[
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader"
				})
			},
			{
				test:/\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/,
				loader:"url-loader?limit=100&name=resource/[name].[ext]"
				
			}

		]
	},
	plugins:[
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login'))
	],

	resolve: {
		alias:{
			util: path.resolve(__dirname,'src/util'),
			"@" : path.resolve(__dirname,'src/page'),
			node_modules : path.resolve(__dirname,'node_modules'),
			service : path.resolve(__dirname,'src/service'),
			
		}
	},
       devServer:{
       	port:8080,
       	inline: true,
       	proxy:{
       		"**/*.do":{
       			target: str.toString(),
       			changeOrigin:true
       		}
       	}
       }
}


if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8080');
}
module.exports = config;
