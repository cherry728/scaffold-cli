const fs = require('fs')
const chalk = require('chalk');
const inquirer = require('inquirer');
const {promisify} = require('util');
const ora = require('ora')
const download = require('download-git-repo')
const IfExist = async (name) => {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(name)) {
            console.log(chalk.red('已经存在拉'))
        } else {
            resolve()
        }
    })
}
const quesList = [
    {
        type: 'list',
        name: 'frame',
        message: 'please choose this project template',
        choices: ['vue', 'react']
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter the project description: '
    },
    {
        type: 'input',
        name: 'author',
        message: 'Please enter the author name: '
    }
]
const Prompt = async () => {
    return Promise.resolve(inquirer.prompt(quesList))
}

const DownloadTemplate = async (repo, dest) => {
    return new Promise((resolve, reject) => {
        console.log('download', download);
        
        download(repo, dest, {clone: true}, function(err) {
            if(!err) {
                resolve()
            } else {
                console.log(chalk.red('Error'))
                reject(err)
            }
        })
    })
}
const clone = async (repo, dest) => {
    const download = promisify(require('download-git-repo'))
    const loading = ora()
    loading.start(`下载...${repo}`)
    await download(repo, dest)
    loading.succeed()
}
const UpdatePackageJson = async (filename, obj) => {
    return new Promise((resolve, reject) => {
        const content = fs.readFileSync(filename).toString()
        const json = JSON.parse(content)
        Object.keys(obj).forEach(key => {
            json[key] = obj[key]
        })
        fs.writeFileSync(filename, JSON.stringify(json, null, '\t'), 'utf-8')
        resolve()
    })
}
module.exports = {
    IfExist,
    Prompt,
    DownloadTemplate,
    UpdatePackageJson
}