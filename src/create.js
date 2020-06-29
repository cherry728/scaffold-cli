const { IfExist, Prompt, DownloadTemplate, UpdatePackageJson } = require('./util.js')
const ora = require('ora')
const chalk = require('chalk')
async function create(name) {
    console.log(name)
    IfExist(name).then(() => {
        Prompt().then(answer => {
            console.log(answer);
            let loading = ora('模板下载中...');
            loading.start('模板下载中...');
            let api;
            if(answer.frame === 'vue') {
                api = 'direct:https://github.com/For-Article/vue-temlate.git'
            }
            DownloadTemplate(api, name).then(value => {
                loading.succeed('模板下载完成');
                answer.name = name;
                UpdatePackageJson(`${name}/package.json`, answer)
                    .then(() => {
                        console.log(chalk.green('配置文件更新完成。'));
                    })
            }, error => {
                loading.fail('模板下载失败');
            })
        })
    })
}
module.exports = {
    create
}