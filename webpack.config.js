function buildConfig(env) {

    var webpack = require('webpack');
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    return {
        entry: "./src/index.tsx",
        output: {
            filename: env === "prod" ? "bundle.js" : "bundle.[hash].js",
            path: __dirname + "/dist"
        },

        plugins: env === "prod" ? [
            new HtmlWebpackPlugin({title: "anaander", template: "index.ejs"}),
            new webpack
                .optimize
                .UglifyJsPlugin({sourceMap: false, beautify: false, comments: false}),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        ] : [
            new HtmlWebpackPlugin({title: "anaander", template: "index.ejs"})
        ],

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                // All output '.js' files will have any sourcemaps re-processed by
                // 'source-map-loader'.
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: "source-map-loader"
                },

                // CSS loader
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },

                // media loader
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader'
                },

                // All files with a '.ts' or '.tsx' extension will be handled by
                // 'awesome-typescript-loader'.
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    exclude: ["node_modules", "src/tests"]
                }
            ]
        }
    };
}

module.exports = buildConfig;
