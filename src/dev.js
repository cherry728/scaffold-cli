const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin') 

function dev(port) {
    console.log(port)
    config.plugins.push(new openBrowserWebpackPlugin({url: `http://localhost:${port}`}))
    new WebpackDevServer(webpack(config), {
        contentBase: './public',
        hot: true,
        historyApiFallback: true
    }).listen(port, 'localhost', (err) => {
        if(err) {
            console.log(err);
        }
    })

}
module.exports = {
    dev
}