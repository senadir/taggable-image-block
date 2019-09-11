const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: [ './src/index.js', './src/editor.scss', './src/style.scss' ],
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].blocks.css',
						},
					},
					{
						loader: 'extract-loader',
					},
					{
						loader: 'css-loader?-url',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
};
