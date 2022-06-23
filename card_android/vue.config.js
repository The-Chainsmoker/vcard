const Timestamp = new Date().getTime();
const Version = '1.0.0'
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
	lintOnSave: false,
	assetsDir: 'static',
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	outputDir: 'dist',
	runtimeCompiler: true, //关键点在这  
	// 调整内部的 webpack 配置。
	// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 清除css，js版本号4
			// config.output.filename('static/js/[name].js').end();
			// config.output.chunkFilename('static/js/[name].js').end();
			// 为生产环境修改配置...
			config.plugin('extract-css').tap(args => [{
				filename: `static/css/[name]_verson_${Version}_${Timestamp}.css`,
				chunkFilename: `static/css/[name]_verson_${Version}_${Timestamp}.css`
			}])
		}
		//不编译图片
		config.module
			.rule('images')
			.test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.fallback.options.name = 'static/img/[name].[ext]?'; //去除图片hash
				options.limit = 1024; //这是字节(Byte)限制，1KB = 1024Byte ,当图片的大小小于 1KB ,则会被转为 base64格式，打包进js文件，大于1KB,则会被打包进 img 文件夹，供链接请求获取。 
				return options
			});
	},
	// configureWebpack: {
	// 	output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
	// 		filename: `[name].verson_${Version}.${Timestamp}.js`,
	// 		chunkFilename: `[name].verson_${Version}.${Timestamp}.js`
	// 		// chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
	// 	}
	// },
	configureWebpack: function () {
		if (process.env.NODE_ENV === 'production') {
			return {
				output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
					filename: `static/js/[name].verson_${Version}.${Timestamp}.js`,
					chunkFilename: `static/js/[name].verson_${Version}.${Timestamp}.js`
					// chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
				},
				plugins: [
					new CompressionPlugin({
						filename: '[path].gz[query]',
						test: /\.js$|\.html$|\.css$/, // 需要压缩的文件类型
						threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
						deleteOriginalAssets: false, // 是否删除原文件
						minRatio: 0.8,
					})
				]
			}
		}
	},

	devServer: {
		proxy: {
			'/api': {
				target: 'https://online.gzekt.com/vcardtest',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},



		// 开启https 访问时使用https://172.31.120.61:8081 
		// https://localhost:8081 也可以访问，不过自带info请求会报错 不清楚具体原因
		https: false
	},
	productionSourceMap: false

}
