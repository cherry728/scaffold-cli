const util = require("util");
const exec = util.promisify(require("child_process").exec);
const ora = require('ora')
const chalk = require('chalk')
const { UpdatePackageJson } = require('./util.js')

async function execCmd(cmd, text) {
    let loading = ora();
    loading.start(`${text}: 命令执行中...`);
    await exec(cmd);
    loading.succeed(`${text}: 命令执行完成`);
}
async function spawn(...arg) {
    const { spawn } = require('child_process')
    
    return new Promise(resolve => {
        const proc = spawn(...arg)
        console.log('..spawn', arg);

        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}
async function init(username, token) {
    let loading = ora()
    console.log('username', username)
    try {
        await execCmd('git init', 'git初始化')
        if(!username || !token) {
            console.log(chalk.red('缺少用户名无法创建远端仓库'))
        } else {
            const projectName = process.cwd().split('/').slice(-1)[0];
            console.log('projectName', process.cwd())
            //Github仓库创建
            // await execCmd(`curl -u "${username}:${token}"  https://api.github.com/user/repos -d '{"name": "${projectName}"}'`, 'Github仓库创建')
            // //关联远端仓库
            // await execCmd(`git remote add origin https://github.com/${username}/${projectName}.git`, '关联远端仓库')
            // // UpdatePackageJson
            // await UpdatePackageJson('./package.json', {
            //     "reposity": {
            //         "type": "git",
            //         "url": `https://github.com/${username}/${projectName}.git`
            //     }
            // }).then(() => {
            //     loading.succeed(`package.json更新repository: 命令执行完成`);
            // });
            // // git add 
            // await execCmd('git add .', '执行git add')
            // // git commit
            // await execCmd('git commit -m "init"', '执行git commit')
            // await execCmd('git push --set-upstream origin master', '执行git push')
        }
        await spawn(`npm`, ['install'], {
            cwd: process.cwd()
        })
        loading.succeed('安装完成！')
    } catch (error) {
        console.log(chalk.red(error))
    }
}
module.exports = {
    init
}