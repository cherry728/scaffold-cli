const webpack = require('webpack')
const chalk = require('chalk')
const config = require('./webpack.build.js');
function build() {
    webpack(config, (err) => {
        if(err) {
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('打包完成'));
        }
        process.exit(-1)
    })
}
module.exports = {
    build
}