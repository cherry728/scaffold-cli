const {program } = require('commander')
const {create} = require('./create')
const { init } = require('./init')
const { dev } = require('./dev')
const { build } = require('./build')
console.log('我是一个项目', create);

let actionMap = {
    create: {
        description: '创建一个新的项目',
        useage: [
            'sc create projectName',
            'sc-cli create projectName',
            'scaffold-cli create projectName'
        ],
        alias: 'c' 
    },
    init: {
        description: '初始化项目',
        useage: [
            'sc init',
            'sc-cli init',
            'scaffold-cli init'
        ],
        alias: 'i',
        options: [
            {
                flags: '-u --username <port>',
                description: 'github用户名',
                defaultValue: ''
            },
            {
                flags: '-t --token <port>',
                description: 'github创建的token',
                defaultValue: ''
            }
        ]
    },
    dev: {
        description: '本地启动项目',
        useage: [
            'sc dev',
            'sc-cli dev',
            'scaffold-cli dev'
        ],
        alias: 'd',
        options: [
            {
                flags: '-p --port <port>',
                description: '端口',
                defaultValue: 3000
            }
        ]
    },
    build: {
        description: '打包项目',
        useage: [
            'sc build',
            'sc-cli build',
            'scaffold-cli build'
        ]
    }
}

Object.keys(actionMap).forEach(action => {
    let actionObj = actionMap[action]
    if(actionObj.options) {
        for(option of actionObj.options) {
            program.option(option.flags, option.description, option.defaultValue)
        }
    }
    
    program
        .command(action)
        .description(actionObj.description)
        .action(() => {
            switch(action) {
                case 'create': 
                    create(...process.argv.slice(3))
                    break
                case 'init':
                    console.log(program.username, program.token);
                    
                    init(program.username, program.token)
                    break
                case 'dev':
                    dev()
                    break
                case 'build':
                    build()
                    break
            }
        })
})
program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);